import * as React from "react";
import {User} from "../models/User";
import {UserService} from "../services/UserService";
import UpdateUserForm from "../components/UpdateUserForm";

export default class UpdateUserPage extends React.Component<{}, {
    loading: boolean,
    updatedUser: User //This will be used to store user details when updating an existing user.
}> {

    public state = {
        loading: false,
        updatedUser: {id: 0, email: '', username: '', password: ''}
    };

    private userService: UserService = new UserService();

    public render() {
        return (
            <div className="wrapper">
                <div className="title-banner">
                    <h3>Update User Form</h3>
                </div>
                <UpdateUserForm/>
                </div>

        );
    }



    /*private populateForm(user: User) {
        const updatedUser = this.state.updatedUser; //Variable that is assigned to the current state of the updatedUser
        updatedUser.id = user.id;
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.password = user.password;
        this.setState({updatedUser: updatedUser});

    }*/

    /**
     *
     * @param userToAdd
     */
    private saveNewUser(userToAdd: User) {
        // if already loading, then return - don't do anything
        if (this.state.loading) {
            return;
        }

        // set in loading state
        this.setState({loading: true});

        // make http request
        this.userService
            .addUser(this.state.updatedUser)
            .subscribe((savedUser: User) => this.onUserSaved(savedUser));

    }

    /**
     *
     * @param savedUser
     */
    private onUserSaved(savedUser: User) {
        this.setState({
            loading: false,
            updatedUser: {id: 0, username: '', password: '', email: ''}
        });
        alert('User has been successfully saved.');
    }

}