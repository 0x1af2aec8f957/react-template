/// 空状态

import { type ReactNode, type HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLIframeElement> {
    needFixInputFontSize: bool; // 是否需要修复在 iOS 上 input 字体小于16px 时，聚焦会被放大的问题
}

export default ({
    needFixInputFontSize,
    onLoad,
    ...otherProps
}: Props) => {
    const handleLoad = () => {
        if (needFixInputFontSize) {
            const metaEl = document.createElement('meta');
            metaEl.setAttribute('name', 'viewport')
            metaEl.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
            document.head.append(metaEl);
        }

        if (typeof onLoad !== 'undefined') handleLoad();
    }
    
    return (
        <iframe {...otherProps} onLoad={handleLoad} />
    )
}