import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Form, Button} from "semantic-ui-react";
import {RouteComponentProps} from 'react-router-dom'

export default class AddUserForm extends React.Component<RouteComponentProps<any> & {},
    {
        loading: boolean;
        newUser: User;
    }> {

    private userService: UserService = new UserService();

    public state = {
        loading: false,
        newUser: {id: 0, email: '', username: '', password: ''}

    };

    /*public componentDidMount(): void {
        // set loading state
        this.setState({
            loading: true,
        });

        // load the data
        this.userService
            .getAllUsers()
            .subscribe((users: User[]) => {
                this.onDataLoaded(users)
            });
    }

    public onDataLoaded(users: User[]) {
        this.setState({
            loading: false,
        });
    }*/

    public render(): React.ReactNode {
        return (
            <div className="main">
                {this.renderAddUserForm()}
            </div>
        );
    }

    private renderAddUserForm() {
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
        this.props.history.push('/');
        // this.props.match.userId
        //alert('User has been successfully added.');
        //return <Redirect to='/' />
    }

}