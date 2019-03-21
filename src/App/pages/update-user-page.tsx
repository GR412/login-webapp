import * as React from "react";
import {Button, Form} from "semantic-ui-react";
import {User} from "../models/User";
import {UserService} from "../services/UserService";

export default class UpdateUserPage extends React.Component<{

}, {
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
            <Form>
                <Form.Field>
                    <label>Username:</label>
                    <input placeholder='Username'
                           value={this.state.updatedUser.username}
                           onChange={this.captureUpdatedUsername.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email:</label>
                    <input placeholder='Email'
                           value={this.state.updatedUser.email}
                           onChange={this.captureUpdatedEmail.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password:</label>
                    <input placeholder='Password'
                           value={this.state.updatedUser.password}
                           onChange={this.captureUpdatedPassword.bind(this)}/>
                </Form.Field>
                <Button className={`primary ui button ${this.state.loading ? 'loading' : ''}`}
                        type='submit'
                        onClick={() => this.saveNewUser(this.state.updatedUser)}>
                    Submit
                </Button>
            </Form>
        );
    }

    /**
     * Methods that capture data from an onChange event.
     *
     * @param event holds the data that is being typed into the input field.
     *
     * Variable newUser is defined and assigned to the current state of newUser.
     *
     * The newUser object properties are assigned to the corresponding onChange event which holds user input data.
     *
     * Finally the state of the newUser is updated to the newUser variable that holds the event data.
     *
     */
    private captureUpdatedUsername(event) {
        const updatedUser = this.state.updatedUser;
        updatedUser.username = event.target.value;
        this.setState({updatedUser: updatedUser})
    }

    private captureUpdatedEmail(event) {
        const updatedUser = this.state.updatedUser;
        updatedUser.email = event.target.value;
        this.setState({updatedUser: updatedUser})

    }

    private captureUpdatedPassword(event) {
        const updatedUser = this.state.updatedUser;
        updatedUser.password = event.target.value;
        this.setState({updatedUser: updatedUser})
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