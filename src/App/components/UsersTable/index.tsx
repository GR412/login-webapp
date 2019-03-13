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
            <div>
                <p>Loading: {this.state.loading}</p>
                {this.renderUsers()}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Label ribbon>First</Label>
                            </Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>


            </div>
        );
    }


    private renderUsers() {
        if (this.state.loading) {
            return null;
        } else {
            return this.state.users.map(user => <p>{user.email}</p>)
        }
    }

}