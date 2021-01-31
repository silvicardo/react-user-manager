import React from "react";
import mount from "@cypress/react";
import useUserEditor from "../../src/hooks/useUserEditor";
import ReactJson from "react-json-view";

// Cypress team suggests "Test The Interface Not The Implementation."
// https://glebbahmutov.com/blog/test-the-interface/

// Testing library docs states "The more your tests resemble the way your software is used, the more confidence they can give you."

// I totally agree with that but testing the implementation of an hook at the highest level before the UI
// helps me isolate + validate with confidence hook logic

describe("useUserEditor hook", function () {
  beforeEach(function () {
    cy.fixture("users/1/user.json").then((data) => {
      this.userJson = data;
    });

    cy.fixture("users/1/friends.json").then((data) => {
      this.userFriendsJson = data;
    });

    cy.fixture("users/1/notFriends.json").then((data) => {
      this.userNotFriendsJson = data;
    });
    this.hookData = null;
    this.MockComponent = ({ userId, isLogActive }) => {
      this.hookData = useUserEditor(userId);
      if (isLogActive) {
        console.log(this.hookData);
      }

      return (
        <div style={{ backgroundColor: "rgb(39, 40, 34)" }}>
          <div style={{ color: "white", textAlign: "center" }}>
            <h1>🤖 hook return value 🤖</h1>
            {props.children}
          </div>
          <ReactJson src={this.hookData} theme={"monokai"} displayDataTypes={false} />
        </div>
      );
    };
  });

  it("retrieves and stores correct user data on load", function () {
    cy.intercept(`**/users/${this.userJson.id}`, this.userJson);
    cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson);
    cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson);

    const HookMockerComponent = this.MockComponent;
    mount(<HookMockerComponent userId={this.userJson.id} />);

    cy.waitUntil(() => this.hookData.state.stored.username == this.userJson.name).then(() => {
      expect(this.hookData.state.stored.username).toEqual(this.userJson.name);
      expect(this.hookData.state.stored.friends).to.have.length(this.userFriendsJson.length);
      expect(this.hookData.state.stored.friends).to.deep.equal(this.userFriendsJson);
      expect(this.hookData.state.stored.unrelatedUsers).to.have.length(this.userNotFriendsJson.length);
      expect(this.hookData.state.stored.unrelatedUsers).to.deep.equal(this.userNotFriendsJson);
      expect(this.hookData.friends).to.deep.equal(this.userFriendsJson);
      expect(this.hookData.notFriends).to.deep.equal(this.userNotFriendsJson);
    });
  });

  it("after load sets a not-friend-user to be friend", function () {
    cy.intercept(`**/users/${this.userJson.id}`, this.userJson);
    cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson);
    cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson);

    const HookMockerComponent = this.MockComponent;
    mount(
      <HookMockerComponent userId={this.userJson.id}>
        <h3>Setting to friend user with id {this.userNotFriendsJson[0].id}</h3>
      </HookMockerComponent>
    );

    cy.waitUntil(() => this.hookData.state.stored.username == this.userJson.name).then(() => {
      const nextFriendId = this.hookData.state.stored.unrelatedUsers[0].id;

      this.hookData.onSetUserToBeFriend(nextFriendId);

      expect(this.hookData.state.next.friendsIds[0]).toEqual(nextFriendId);
      expect(this.hookData.state.next.friendsIds).to.have.length(1);

      expect(this.hookData.state.next.removingFriendshipsIds).to.have.length(0);
      expect(this.hookData.state.next.unrelatedUsersIds).to.have.length(0);

      expect(this.hookData.friends.find((friend) => friend.id === nextFriendId)).to.exist;
      expect(this.hookData.notFriends.find((friend) => friend.id === nextFriendId)).to.be.undefined;
    });
  });

  it("after load sets a friend to be not a friend anymore", function () {
    cy.intercept(`**/users/${this.userJson.id}`, this.userJson);
    cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson);
    cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson);

    const HookMockerComponent = this.MockComponent;
    mount(
      <HookMockerComponent userId={this.userJson.id}>
        <h3>Unfriend user with id {this.userFriendsJson[0].id}</h3>
      </HookMockerComponent>
    );

    cy.waitUntil(() => this.hookData.state.stored.username === this.userJson.name).then(() => {
      const deletingFriendId = this.hookData.state.stored.friends[0].id;
      const deletingFriendshipId = this.hookData.state.stored.friends[0].friendshipId;

      this.hookData.onSetUserToBeUnrelated(deletingFriendId);

      expect(this.hookData.state.next.friendsIds).to.have.length(0);

      expect(this.hookData.state.next.removingFriendshipsIds).to.have.length(1);
      expect(this.hookData.state.next.removingFriendshipsIds[0]).toEqual(deletingFriendshipId);

      expect(this.hookData.state.next.unrelatedUsersIds).to.have.length(1);
      expect(this.hookData.state.next.unrelatedUsersIds[0]).to.equal(deletingFriendId);

      expect(this.hookData.friends.find((friend) => friend.id === deletingFriendId)).to.be.undefined;
      expect(this.hookData.notFriends.find((friend) => friend.id === deletingFriendId)).to.exist;
    });
  });
});
