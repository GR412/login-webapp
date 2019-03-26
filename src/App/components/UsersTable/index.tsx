import * as React from "react"; //Import the react framework.
import "./index.css";
import {UserService} from "../../services/UserService"; //Import the UserService class so it's methods can be accessed.
import {User} from "../../models/User"; //Import the User object so it can be used in this component.
import {Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class UsersTable extends React.Component<{}, {
    loading: boolean;
    users: User[];
}> {

    private userService: UserService = new UserService();

    public state = {
        loading: false,
        users: [],
    };

    public componentDidMount(): void {
       this.reloadAllUsers();
    }

    public reloadAllUsers() {
        this.setState({
            loading: true,
            users: []
        });

        this.userService
            .getAllUsers()
            .subscribe((users: User[]) => {
                this.setState({
                    loading: false,
                    users: users
                });
            });
    }

    /**
     * Special React method that renders the actual HTML content, once the componentDidMount has set the state and
     * extracted / loaded the data from the backend api.
     *
     * A celled semantic-ui-react table is created which contains calls to two methods that render the header
     * and body of the table.
     *
     * Underneath a call to another method which renders a semantic-ui-react form is made.
     *
     * @return a semantic-ui-react table and form
     */
    public render(): React.ReactNode {
        return (
            <div className="main">
                <Table celled>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
            </div>
        );
    }

    /**
     * Method returns a table header consisting of 5 headers.
     *
     * This is a special react-semantic ui table that has predetermined css styles.
     *
     * @return a semantic-ui-react table header
     */
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

    /**
     * Method returns the contents of the table.
     *
     * NEEDS AN EXPLANATION
     */
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
                                <button className={"negative ui button"} onClick={() => this.deleteUser(user.id)}>
                                    Delete
                                </button>
                                <Link to={`/update-user/${user.id}`}>
                                    <button className={"ui orange button"}>Update</button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        );
    }


    /**
     * Method that populates the update user form with data captured from the users table when the modify button is
     * pressed.
     *
     * @param userId is the supplied user data captured from the user table.
     *
     * Each detail of the supplied user parameter (id, username, email and password) is assigned to the updatedUser
     * variable. Then we assign the updatedUser state with the updatedUser variable which holds the supplied user data.
     */

    private deleteUser(userId: number) {
        this.userService
            .deleteUser(userId)
            .subscribe(() => this.reloadAllUsers());
    }

}