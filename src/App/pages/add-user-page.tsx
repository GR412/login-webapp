import * as React from "react";
import {Button, Form} from "semantic-ui-react"; //Import various semantic-ui-react elements so they can be used.
import {User} from "../models/User";
import {UserService} from "../services/UserService";

export default class AddUserPage extends React.Component<{}, {
    loading: boolean,
    newUser: User
}> {

    public state = {
        loading: false,
        newUser: {id: 0, email: '', username: '', password: ''}
    };

    private userService: UserService = new UserService();

    public render() {
        return (
            <Form>
                <Form.Field>
                    <label>Username:</label>
                    <input placeholder='Username'
                           value={this.state.newUser.username}
                           onChange={this.captureNewUsername.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email:</label>
                    <input placeholder='Email'
                           value={this.state.newUser.email}
                           onChange={this.captureNewEmail.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password:</label>
                    <input placeholder='Password'
                           value={this.state.newUser.password}
                           onChange={this.captureNewPassword.bind(this)}/>
                </Form.Field>
                <Button className={`primary ui button ${this.state.loading ? 'loading' : ''}`}
                        type='submit'
                        onClick={() => this.saveNewUser(this.state.newUser)}>
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
    private captureNewUsername(event) {
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.username = event.target.value;
        this.setState({newUser: newUser})
    }

    /**
     *
     * @param event
     */
    private captureNewEmail(event) {
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.email = event.target.value;
        this.setState({newUser: newUser})
    }

    /**
     *
     * @param event
     */
    private captureNewPassword(event) {
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.password = event.target.value;
        this.setState({newUser: newUser})
    }

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
            .addUser(this.state.newUser)
            .subscribe((savedUser: User) => this.onUserSaved(savedUser));

    }

    /**
     *
     * @param savedUser
     */
    private onUserSaved(savedUser: User) {
        this.setState({
            loading: false,
            newUser: {id: 0, username: '', password: '', email: ''}
        });
        alert('User has been successfully saved.');
    }

}