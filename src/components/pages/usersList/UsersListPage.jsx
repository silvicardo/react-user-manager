import React from 'react';
import PageTitle from "../../common/PageTitle";
import lang from "../../../lang";
import LinkButton from "../../common/LinkButton";
import AllUsersList from "./AllUsersList";

export const UsersListPage = ({className = '', users, isFetchingUsers, apiUsersError}) => {

    if(isFetchingUsers === true) return <p className={'loading'}>{lang.users.fetching.loadingUsers}</p>;

    if(apiUsersError) return <p className={'error'}>{apiUsersError}</p>;

    return (
        <div className={`users-list-page container  py-3 ${className}`}>
            <div className={'d-flex justify-content-between mb-5'}>
                <PageTitle className={'text-capitalize'}>{lang.users.list}</PageTitle>
                <LinkButton className={'btn btn-success btn-lg'} to={'/user/create'}>{lang.users.new}</LinkButton>
            </div>
            <div>
                <AllUsersList users={users} />
            </div>

        </div>
    );
};

export default UsersListPage;