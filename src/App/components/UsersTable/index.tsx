import * as React from "react"; //Import the react framework.
import "./index.css";
import {UserService} from "../../services/UserService"; //Import the UserService class so it's methods can be accessed.
import {User} from "../../models/User"; //Import the User object so it can be used in this component.
import {Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

//The UsersTable class extends React.Component in order to be react component.
export default class UsersTable extends React.Component<{}, {

    //Define the state and their types.
    loading: boolean; //Determines if a page is currently loading or has loaded.
    users: User[], //This will hold an Array of User objects that will be extracted from the backend database.

}> {

    //A variable that will be assigned to an instance of the UserService class
    private userService: UserService = new UserService();

    //set the initial state
    public state = {
        loading: false,
        users: [],
    };

    //This is a special react method that runs before the page is rendered it sets the state and extracts / loads data.
    public componentDidMount(): void {
        //First set the state that needs to be set.
        this.setState({
            loading: true, //the loading state should be set to true as loading commences before the page is rendered.
            users: [] //The user list should be reset to an empty array before rendering so fresh data can be extracted.
        });

        /**
         * We extract all of the users from the backend database with the UserService and assign each to a new users
         * array and then call the onUsersLoaded method in which we supply the new users array.
         */
        this.userService
            .getAllUsers()
            .subscribe((users: User[]) => this.onUsersLoaded(users));
    }

    //Updates the state, ready for the page to be rendered to the user.
    public onUsersLoaded(users: User[]) {
        this.setState({
            loading: false, //After the data has extracted and loaded the loading state can be set to false.
            users: users //The users state can now be assigned to an array of users ready to be displayed to the user.
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
                                <button className={"negative ui button"}
                                        onClick={() => this.deleteUser(user.id)}>Delete
                                </button>
                                <Link to={`/update-user/${user.id}`}>
                                    <button className={"ui orange button"}>Modify</button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        );
    }



    /*------------------------------------------------------------------METHODS THAT CAPTURE INPUT FOR onClick---------------------------------------------------------*/

    /**
     * Method that populates the update user form with data captured from the users table when the modify button is
     * pressed.
     *
     * @param user is the supplied user data captured from the user table.
     *
     * Each detail of the supplied user parameter (id, username, email and password) is assigned to the updatedUser
     * variable. Then we assign the updatedUser state with the updatedUser variable which holds the supplied user data.
     */

    /*private populateForm(user: User) {
        const updatedUser = this.state.updatedUser; //Variable that is assigned to the current state of the updatedUser
        updatedUser.id = user.id;
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.password = user.password;
        this.setState({updatedUser: updatedUser});

    }*/

    private linkToUpdatePage() {
        <Link to="/update-user"></Link>
    }

    private deleteUser(userId: number) {
        this.userService
            .deleteUser(userId)
            .subscribe((user: User) => this.onUserLoaded(user));

    }

    private onUserLoaded(user: User) {
        // set loading state
        this.setState({
            loading: true,
            users: []
        });

        // load the data
        this.userService
            .getAllUsers()
            .subscribe((users: User[]) => this.onUsersLoaded(users));
    }

    private updateUser(userToUpdate: User) {
        this.userService.updateUser(userToUpdate)
            .subscribe((user: User) => {
                this.setState({
                    loading: true,
                    users: []
                });

                this.userService
                    .getAllUsers()
                    .subscribe((users: User[]) => {
                        this.onUsersLoaded(users)

                    });
            });
    }

}