import React from 'react';
import PageTitle from "../../common/PageTitle";
import lang from "../../../lang";
import LinkButton from "../../common/LinkButton";
import AllUsersList from "./components/AllUsersList";

export const UsersListPage = ({className = '', users, isFetchingUsers, apiUsersError}) => {

    return (
        <div className={`users-list-page container  py-3 ${className}`}>
            <div className={'d-flex justify-content-between mb-5'}>
                <PageTitle className={'text-capitalize'}>{lang.users.list}</PageTitle>
                <LinkButton className={'btn btn-success btn-lg'} to={'/user/create'}>{lang.users.new}</LinkButton>
            </div>
            <div>
                <h2 className={`loading ${!isFetchingUsers ? 'd-none' : ''}`}>{lang.users.fetching.loadingUsers}</h2>
                <h2 className={!apiUsersError ? 'd-none' : ''}>{lang.users.errors.list.apiOrNetworkFailure}</h2>
                <AllUsersList className={apiUsersError || isFetchingUsers ? 'd-none' : ''} users={users} />
            </div>

        </div>
    );
};

export default UsersListPage;