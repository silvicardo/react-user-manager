import React from 'react';
import mount from '@cypress/react'
import useUserEditor from "../../src/hooks/useUserEditor";
import ReactJson from 'react-json-view'

describe('useUserEditor hook',function(){

    beforeEach(function () {

        cy.fixture('users/1/user.json').then(data => {
            this.userJson = data;
        })

        cy.fixture('users/1/friends.json').then(data => {
            this.userFriendsJson = data;
        })

        cy.fixture('users/1/notFriends.json').then(data => {
            this.userNotFriendsJson = data;
        })
        this.hookData;
        this.MockComponent = (props) => {

            this.hookData = useUserEditor(props.userId);

            return (
                <div style={{backgroundColor: 'rgb(39, 40, 34)'}}>
                    <h1 style={{color: "white"}}>🤖 HOOK STATE 🤖</h1>
                    <ReactJson src={this.hookData.state} theme={"monokai"} displayDataTypes={false} />
                </div>
            )

        };


    })

    it('retrieves and stores correct user data on load', function(){

        cy.intercept(`**/users/${this.userJson.id}`, this.userJson)
        cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson)
        cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson)

        const HookMockerComponent = this.MockComponent;
        mount(<HookMockerComponent userId={this.userJson.id}/>)

        cy.waitUntil(() => this.hookData.state.stored.username == this.userJson.name)
            .then(() => {
                expect(this.hookData.state.stored.username).to.equal(this.userJson.name)
                expect(this.hookData.state.stored.friends).to.have.length(this.userFriendsJson.length);
                expect(this.hookData.state.stored.friends).to.deep.equal(this.userFriendsJson);
                expect(this.hookData.state.stored.unrelatedUsers).to.have.length(this.userNotFriendsJson.length);
                expect(this.hookData.state.stored.unrelatedUsers).to.deep.equal(this.userNotFriendsJson);
            });

    })

    it('after load sets a not-friend-user to be friend',function(){

        cy.intercept(`**/users/${this.userJson.id}`, this.userJson)
        cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson)
        cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson)

        const HookMockerComponent = this.MockComponent;
        mount(<HookMockerComponent userId={this.userJson.id}/>)

        cy.waitUntil(() => this.hookData.state.stored.username == this.userJson.name)
            .then(() => {

                const nextFriendId = this.hookData.state.stored.unrelatedUsers[0].id;

                this.hookData.onSetUserToBeFriend(nextFriendId)

                expect(this.hookData.state.next.friendsIds[0]).to.equal(nextFriendId)
                expect(this.hookData.state.next.friendsIds).to.have.length(1)

            });

    })

    it('after load sets a friend to be not a friend anymore',function(){

        cy.intercept(`**/users/${this.userJson.id}`, this.userJson)
        cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson)
        cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson)

        const HookMockerComponent = this.MockComponent;
        mount(<HookMockerComponent userId={this.userJson.id}/>)

        cy.waitUntil(() => this.hookData.state.stored.username == this.userJson.name)
            .then(() => {

                const deletingFriendId = this.hookData.state.stored.friends[0].id;
                const deletingFriendshipId = this.hookData.state.stored.friends[0].friendshipId


                this.hookData.onSetUserToBeUnrelated(deletingFriendId)

                expect(this.hookData.state.next.removingFriendshipsIds).to.have.length(1)
                expect(this.hookData.state.next.removingFriendshipsIds[0]).to.equal(deletingFriendshipId)

                expect(this.hookData.state.next.unrelatedUsersIds).to.have.length(1)
                expect(this.hookData.state.next.unrelatedUsersIds[0]).to.equal(deletingFriendId)

            });



    })




});