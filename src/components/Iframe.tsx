/// iframe 组件

import { type HTMLProps, type SyntheticEvent } from 'react';

interface Props extends HTMLProps<HTMLIFrameElement> {
    needFixInputFontSize: boolean; // 是否需要修复在 iOS 上 input 字体小于16px 时，聚焦会被放大的问题
}

export default ({
    onLoad,
    needFixInputFontSize = false,
    ...otherProps
}: Props) => {
    const handleLoad = (event: SyntheticEvent<EventTarget>) => {
        if (needFixInputFontSize) {
            const metaEl = document.createElement('meta');
            metaEl.setAttribute('name', 'viewport')
            metaEl.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
            document.head.append(metaEl);
        }

        if (typeof onLoad !== 'undefined') handleLoad(event);
    }

    return (
        <iframe {...otherProps} onLoad={handleLoad} />
    )
}