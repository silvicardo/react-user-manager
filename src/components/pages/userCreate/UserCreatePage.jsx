import React from 'react';
import useStackedViews from "../../../hooks/useStackedViews";
import StackedView from "./components/StackedView";
import UserCreateView from "./components/UserCreateView";

const UserCreatePage = ({className = ''}) => {

    const [stackedViewIds, onStackedViewDismiss, addViewToStack] = useStackedViews();

    const onUserSubmitSuccess = () => {

    }

    return (
        <div className={`user-create-page ${className} position-relative vw-100 vh-100`}>
            {stackedViewIds.map(stackedViewId => (
                <StackedView
                    key={stackedViewId}
                    id={stackedViewId}
                    isActive={stackedViewId + 1 === stackedViewIds.length}
                    onDismiss={onStackedViewDismiss}
                    contentContainerClass={'bg-white w-100 h-100 border-left border-dark'}
                    >
                        <UserCreateView
                            onCreateNewUserClick={addViewToStack}
                            onUserSubmitSuccess={onUserSubmitSuccess}
                        />
                </StackedView>
            ))}
        </div>
    );
};

export default UserCreatePage;