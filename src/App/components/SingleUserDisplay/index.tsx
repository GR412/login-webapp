import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Label, Table} from "semantic-ui-react";

export default class SingleUserDisplay extends React.Component<{userId : number},
    {
    loading: boolean;
    user: User
}> {

    private userService: UserService = new UserService();

    public state = {
        loading : true,
        user: undefined
    };

    public componentDidMount(): void {

        // load the data : how to get the path variable
        this.userService
            .getUser(this.props.userId)
            .subscribe((user: User) => {
                this.onDataLoaded(user)
            });
    }

    public onDataLoaded(user: User) {
        this.setState({
            loading: false,
            user: user
        });
    }

    public render(): React.ReactNode {
        if(this.state.loading){
            return null;
        }
        return (
            <div className = "table">
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
        const user : User = this.state.user;

        return (
            <Table.Body>

                        <Table.Row>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.password}</Table.Cell>
                        </Table.Row>
            </Table.Body>
        );
    }

}