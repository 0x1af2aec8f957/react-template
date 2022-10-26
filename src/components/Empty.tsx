/// 空状态

import { type ReactNode } from 'react';

interface Props {
    rectSize?: number,
    emptyText: ReactNode,
    children: ReactNode[],
}

export default ({
    rectSize = 100,
    emptyText = (<p className='empty-text no-margin' style={{
        fontWeight: 400,
        fontSize: '16px',
        textAlign: 'center',
        color: '#828282',
        lineHeight: '25px',
    }}>暂无内容</p>),
    children = []
}: Props) => {

    return (
        <div id="empty" style={{
            display: 'inline-block',
            position: 'relative',
            margin: 0,
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%'
        }}>
            <div className="background-reset" style={{
                    width: `${rectSize}px`, height: `${rectSize}px`,
                    backgroundImage: 'url("../assets/images/empty.png")'
                }} />
            { emptyText }
            { children }
        </div>
    )
}