import { 
    type ReactElement,
    type ReactNode,
    isValidElement,
    Children,
    useMemo,
    useState,
    cloneElement,
    useEffect,
    useLayoutEffect
} from 'react';

import { nextTick } from '../utils/common';

const enum WorkLine { // 流程状态
    EnterBefore = 'enter-before', // 进入前
    EnterActive = 'enter-active', // 进入中
    Entered = 'enter-done', // 进入完成

    ExitBefore = 'exit-before', // 离开前
    ExitActive = 'exit-active', // 离开中
    Exited = 'exit-done', // 离开完成
}

type CallBackFunc = (state: WorkLine) => void;
interface TransitionProps {
    name: string, // 过渡使用的样式类名、前缀
    duration?: number | { enter: number /* 进入过渡时间 */, exit: number /* 离开过渡时间 */},
    delay?: TransitionProps['duration'], // 过渡前的延时时长
    type?: 'transition' | 'animation', // 过渡类型
    children: ReactNode, // 过渡元素

    onEnterBefore?: CallBackFunc, // 进入前回调
    onEnterActive?: CallBackFunc, // 进入中回调
    onEntered?: CallBackFunc, // 进入进入完成回调
    onExitBefore?: CallBackFunc, // 离开前回调
    onExitActive?: CallBackFunc, // 离开中回调
    onExited?: CallBackFunc, // 离开完成回调
}
const Transition = ({
    name,
    duration = 0,
    delay = 0,
    type = 'transition',
    children: newChild,

    onEnterBefore,
    onEnterActive,
    onEntered,
    onExitBefore,
    onExitActive,
    onExited
}: TransitionProps) => {
    let timeoutTimer: ReturnType<typeof setTimeout> | undefined; // 计时器状态
    const [workLoop, setState] = useState<WorkLine>(WorkLine.EnterBefore);
    const [rawChild, setRawChild] = useState<ReactNode>(); // 实际处理的组件（旧组件），children 为实时组件

    const handleCancelTimeout = () => { // 取消 timeout 计时器
        if (typeof timeoutTimer === 'undefined') return;

        clearTimeout(timeoutTimer);
        timeoutTimer = undefined;
    }

    const isComponentTypeChange = useMemo(() => !Object.is((rawChild as ReactElement)?.type, (newChild as ReactElement)?.type), [newChild, rawChild]); // 组件类型是否发生了变化，包括组件的进入和离开

    const transitionClassNames = useMemo(() => {
        const classNames = new Set();
        classNames.add(name);
        classNames.add(`${name}-${workLoop}`);

        return Array.from(classNames.values());
    }, [name, workLoop]);
    const enterDelay = useMemo(() => typeof delay === 'number' ? delay : delay.enter, [delay]) // 进入延时时长
    const enterDuration = useMemo(() => typeof duration === 'number' ? duration : duration.enter, [duration]) // 进入时间
    const exitDelay = useMemo(() => typeof delay === 'number' ? delay : delay.exit, [delay]); // 离开延时时长
    const exitDuration = useMemo(() => typeof duration === 'number' ? duration : duration.exit, [duration]); // 离开时间
    const stateDelay = useMemo(() => { // 跟随状态的实时延时时长
        if (workLoop === WorkLine.EnterActive) return enterDelay;
        if (workLoop === WorkLine.ExitActive) return exitDelay;

        return 0;
    }, [workLoop, enterDelay, exitDelay]);
    const stateDuration = useMemo(() => { // 跟随状态的实时过渡时间
        if (workLoop === WorkLine.EnterActive) return enterDuration;
        if (workLoop === WorkLine.ExitActive) return exitDuration;

        return 0;
    }, [workLoop, enterDuration, exitDuration]);

    useEffect(() => { // 新组件的添加与移除处理
        const isCheckComponentByWorkLoop = [WorkLine.EnterBefore, WorkLine.Exited].includes(workLoop); // 当前过渡状态是否需要切换组件
        if (!isCheckComponentByWorkLoop && isComponentTypeChange) return; // 过渡状态不允许切换组件，并且组件类型发生了变化时将不切换组件，这种情况需要对组件进行过渡处理（组件类型没有发生变化时需要切换组件，避免出现组件缓存）

        setRawChild(newChild); // 将实时组件设置为新组件
    }, [workLoop, newChild, isComponentTypeChange]);

    useEffect(() => { // 当新旧组件变化时，需要手动处理 workLoop 的 before 手动流程部分
        if (!isComponentTypeChange) return; // 组件类型未发生变化时，不处理 workLoop

        if (workLoop === WorkLine.Exited) setState(WorkLine.EnterBefore);
        if (workLoop === WorkLine.Entered) setState(WorkLine.ExitBefore);
    }, [isComponentTypeChange, workLoop]);

    useLayoutEffect(() => { // workLoop 自动化流程
        switch (workLoop) {
            case WorkLine.EnterBefore: // 进入前
                nextTick(() => {
                    setState(WorkLine.EnterActive);
                });
                return;
            case WorkLine.EnterActive: // 进入中
                timeoutTimer = setTimeout(() => { // 等待过渡状态
                    setState(WorkLine.Entered); // 过渡结束
                    handleCancelTimeout();
                }, enterDelay + enterDuration);
                return;
            case WorkLine.ExitBefore: // 离开前
                nextTick(() => {
                    setState(WorkLine.ExitActive);
                });
                return;
            case WorkLine.ExitActive: // 离开中
                timeoutTimer = setTimeout(() => { // 等待过渡状态
                    setState(WorkLine.Exited); // 过渡结束
                    handleCancelTimeout();
                }, exitDelay + exitDuration);
                return;
            case WorkLine.Entered: // 已进入
            case WorkLine.Exited: // 已离开
            default:
                break;
        }

        return handleCancelTimeout;
    }, [workLoop, enterDuration, enterDelay, exitDuration, exitDelay, timeoutTimer]);

    const childComponent = useMemo(() => Children.map(rawChild, (child: any) => { // 实际展示的组件
        const _child = child as ReactElement;
        if (!isValidElement(child)) return _child; // 不是节点直接返回，无法添加过渡效果

        const hasTransitionStyle = [WorkLine.EnterActive,WorkLine.ExitActive].includes(workLoop); // 是否需要过渡样式
        const isAnimationType = type === 'animation'; // 过渡类型是否是动画类型
        const classNames = _child.props.className?.replace(/(^\s+)|(\s+)$/igm, '')?.split(/\s+/igm) ?? []; // 子组件实际拥有的 className 集合
        const style = { // 设置过渡相关样式
            ..._child.props.style,
            [`${type}Duration`]: hasTransitionStyle ? `${stateDuration}ms` : undefined, // 在需要过渡时，添加过渡时间周期样式
            [`${type}Delay`]: hasTransitionStyle ? `${stateDelay}ms` : undefined, // 在需要过渡时，添加过渡时间周期样式
            animationFillMode: hasTransitionStyle && isAnimationType ? 'forwards' : undefined, // 在过渡类型为动画的情况下，需要将样式设置为动画结束时的状态
        };

        return cloneElement(
            _child,
            {
                ..._child.props,
                className: [...classNames, ...transitionClassNames].join(' '), // 添加过渡 className
                style,
            }
        );
    }), [transitionClassNames, rawChild, stateDuration, stateDelay, type, workLoop]);

    useEffect(() => { // workLoop 变化时，执行props提供的回调
        if (!isValidElement(rawChild)) return; // 当新元素不是可验证的元素时，不执行回调（可能是在卸载元素）

        switch(workLoop) {
            case WorkLine.EnterBefore:
                onEnterBefore?.(workLoop);
                break;
            case WorkLine.EnterActive:
                onEnterActive?.(workLoop);
                break;
            case WorkLine.Entered:
                onEntered?.(workLoop);
                break;
            case WorkLine.ExitBefore:
                onExitBefore?.(workLoop);
                break;
            case WorkLine.ExitActive:
                onExitActive?.(workLoop);
                break;
            case WorkLine.Exited:
                onExited?.(workLoop);
                break;
            default:
                return;

        }
    }, [rawChild, workLoop, onEnterBefore, onEnterActive, onEntered, onExitBefore, onExitActive, onExited]);

    return childComponent as any;
}

export default Transition;
