import React, {useState} from "react";
import lang from "../../../../lang";

const StackedView = ({className = '', id, isActive, onDismiss, children, contentContainerClass = ''}) => {

    const [isAttemptingDismiss, setIsAttemptingDismissing] = useState(false);

    return (
        <div key={id} className={`stacked-view position-absolute w-100 h-100 d-flex ${className}`}>
            <div
                className={'opaque-dismiss-area'}
                style={{
                    width: id < 15 ? `${id * 50}px` : '750px',
                    backgroundColor: `rgba(0, 0, 0, ${isActive ? 0.5 : 0})`,
                    cursor: "pointer"
                }}
                onClick={() => setIsAttemptingDismissing(true)}
            />
            <div className={`active-view ${contentContainerClass} position-relative`} style={{overflowY: isAttemptingDismiss? 'hidden': 'auto'}}>
                {children}
                <div
                    className={`confirm dismiss-area position-absolute ${!isAttemptingDismiss ? 'd-none' : 'd-flex flex-column justify-content-center align-items-center'}`}
                    style={{
                        backgroundColor: `rgba(0, 0, 0, 0.8)`,
                        top:0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <h2 className={'text-danger text-uppercase'}>{lang.users.stackViews.areYouSureToDismiss}</h2>
                    <div className={'d-inline-block mt-5'}>
                        <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={() => setIsAttemptingDismissing(false)}
                        >
                            {lang.users.stackViews.stay}
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onDismiss}
                        >
                            {lang.users.stackViews.dismiss}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StackedView;