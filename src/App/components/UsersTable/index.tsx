import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Label, Table} from "semantic-ui-react";

export default class UsersTable extends React.Component<{}, {
    loading: boolean;
    users: User[],
    newUser: User
}> {

    private userService: UserService = new UserService();

    public state = {
        loading: false,
        users: [],
        newUser: {email: '', username: '', password: ''}
    };

    public componentDidMount(): void {
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
    }

    public onDataLoaded(users: User[]) {
        this.setState({
            loading: false,
            users: users
        });
    }

    public render(): React.ReactNode {
        return (
            <div className = "table">
                <p>Loading: {this.state.loading}</p>
                <Table celled>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
            </div>
        );
    }

    private renderTableHeader()
    {
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

    private renderTableBody()
    {
        return (
            <Table.Body>
                {this.state.users.map(user => {
                    return (
                        <Table.Row>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.password}</Table.Cell>
                            <Table.Cell><button className={"negative ui button"} onClick={() => this.deleteItem(user.id)}>Delete</button></Table.Cell>
                        </Table.Row>
                    );
                })}
                <Table.Row>
                    <Table.Cell>N/A</Table.Cell>
                    <Table.Cell><input value={this.state.newUser.username} onChange={this.onChangeUsername.bind(this)}/></Table.Cell>
                    <Table.Cell><input value={this.state.newUser.email} onChange={this.onChangeEmail.bind(this)}/></Table.Cell>
                    <Table.Cell><input value={this.state.newUser.password} onChange={this.onChangePassword.bind(this)}/></Table.Cell>
                    <Table.Cell><button className={"positive ui button"} onClick={() => this.AddItem()}>Add</button></Table.Cell>
                </Table.Row>
            </Table.Body>
        );
    }

    private onChangeUsername(event){
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.username = event.target.value;
        this.setState({newUser: newUser})
    }

    private onChangeEmail(event){
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.email = event.target.value;
        this.setState({newUser: newUser})
    }

    private onChangePassword(event){
        // this.props or this.state -> bind
        const newUser = this.state.newUser;
        newUser.password = event.target.value;
        this.setState({newUser: newUser})
    }


    private deleteItem(userId: number){
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

    private AddItem(){
        this.userService.addUser()
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

}