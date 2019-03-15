import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Label, Table} from "semantic-ui-react";

export default class UsersTable extends React.Component<{}, {
    loading: boolean;
    users: User[]
}> {

    private userService: UserService = new UserService();

    public state = {
        loading : false,
        users: []
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
                        </Table.Row>
                    );
                })}
            </Table.Body>
        );
    }

}