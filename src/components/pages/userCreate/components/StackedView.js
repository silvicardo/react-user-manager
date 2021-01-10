import React from "react";

const StackedView = ({className = '', id, isActive, onDismiss, children, contentContainerClass = ''}) => {

    return (
        <div key={id} className={`stacked-view position-absolute w-100 h-100 d-flex ${className}`}>
            <div
                className={'opaque-dismiss-area'}
                style={{
                    width: id < 15 ? `${id * 50}px` : '750px',
                    backgroundColor: `rgba(0, 0, 0, ${isActive ? 0.5 : 0})`,
                    cursor: "pointer"
                }}
                onClick={onDismiss}
            />
            <div className={`active-view ${contentContainerClass}`} style={{overflowY: 'auto'}}>
                {children}
            </div>
        </div>
    )
}

export default StackedView;