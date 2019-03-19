import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Form, Checkbox, Button, Table} from "semantic-ui-react";

export default class UsersTable extends React.Component<{}, {

  //define the state and their types
    loading: boolean;
    users: User[],
    newUser: User,
    updatedUser: User
}> {

    //create a variable to access the UserService class
    private userService: UserService = new UserService();

    //set the initial state
    public state = {
        loading: false,
        users: [],
        newUser: {email: '', username: '', password: ''},
        updatedUser: {id: 0, email: '', username: '', password: ''}
    };

    //runs before the page is rendered
    public componentDidMount(): void {
        //first set the state that needs to be set
        this.setState({
            loading: true, //loading state should be set to true as loading commences before the page is rendered
            users: [] //user list should be empty before rendering
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
            users: users
        });
    }

    public render(): React.ReactNode {
        return (
            <div className="main">
                <Table celled>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
                {this.renderUserUpdateForm()}
            </div>
        );
    }

    private renderTableHeader() {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID:</Table.HeaderCell>
                    <Table.HeaderCell>Username:</Table.HeaderCell>
                    <Table.HeaderCell>Email:</Table.HeaderCell>
                    <Table.HeaderCell>Password:</Table.HeaderCell>
                    <Table.HeaderCell>Action:</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

        );
    }

    private renderTableBody() {
        return (
            <Table.Body>
                {this.state.users.map((user, index) => {
                    return (
                        <Table.Row key={`user-details-${index}`}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.password}</Table.Cell>
                            <Table.Cell>
                                <button className={"negative ui button"}
                                        onClick={() => this.deleteItem(user.id)}>Delete
                                </button>
                                <button className={"ui orange button"} onClick={() => this.populateForm(user)}>Modify
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
                <Table.Row>
                    <Table.Cell>N/A</Table.Cell>
                    <Table.Cell><input value={this.state.newUser.username}
                                       onChange={this.captureNewUsername.bind(this)}/></Table.Cell>
                    <Table.Cell><input value={this.state.newUser.email}
                                       onChange={this.captureNewEmail.bind(this)}/></Table.Cell>
                    <Table.Cell><input value={this.state.newUser.password}
                                       onChange={this.captureNewPassword.bind(this)}/></Table.Cell>
                    <Table.Cell>
                        <button className={"positive ui button"} onClick={() => this.AddItem(this.state.newUser)}>Add
                        </button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        );
    }

    private renderUserUpdateForm() {
        return (
            <Form>
                <Form.Field>
                    <label>Username:</label>
                    <input placeholder='Username' value={this.state.updatedUser.username}
                           onChange={this.captureUpdatedUsername.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email:</label>
                    <input placeholder='Email' value={this.state.updatedUser.email}
                           onChange={this.captureUpdatedEmail.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password:</label>
                    <input placeholder='Password' value={this.state.updatedUser.password}
                           onChange={this.captureUpdatedPassword.bind(this)}/>
                </Form.Field>
                <Button className={"primary ui button"} type='submit' onClick={() => this.updateUser(this.state.updatedUser)}>Submit</Button>
            </Form>

        );
    }

    private captureNewUsername(event) {
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.username = event.target.value;
        this.setState({newUser: newUser})
    }

    private captureNewEmail(event) {
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.email = event.target.value;
        this.setState({newUser: newUser})
    }

    private captureNewPassword(event) {
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.password = event.target.value;
        this.setState({newUser: newUser})
    }

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


    private deleteItem(userId: number) {
        this.userService.deleteUser(userId)
            .subscribe((user: User) => {
                // set loading state
                this.setState({
                    loading: true,
                    users: []
                });

                // load the data
                this.userService
                    .getAllUsers()
                    .subscribe((users: User[]) => {
                        this.onDataLoaded(users)
                    });
            });

    }

    private AddItem(userToAdd: User) {
        this.userService.addUser(userToAdd)
            .subscribe((user: User) => {
                // set loading state
                this.setState({
                    loading: true,
                    users: []
                });

                // load the data
                this.userService
                    .getAllUsers()
                    .subscribe((users: User[]) => {
                        this.onDataLoaded(users)
                    });
            });

    }

    private updateUser(userToUpdate: User)
    {
        this.userService.updateUser(userToUpdate)
            .subscribe((user: User) => {
                this.setState({
                    loading: true,
                    users: []
                });

                this.userService
                    .getAllUsers()
                    .subscribe((users: User[]) => {
                    this.onDataLoaded(users)

                });

            });

    }

    private populateForm(user: User) {
        const updatedUser = this.state.updatedUser;
        updatedUser.id = user.id;
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.password = user.password;
        this.setState({updatedUser: updatedUser});

    }

}