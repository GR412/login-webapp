import * as React from "react"; //Import the react framework.
import "./index.css";
import {UserService} from "../../services/UserService"; //Import the UserService class so it's methods can be accessed.
import {User} from "../../models/User"; //Import the User object so it can be used in this component.
import {Form, Button, Table} from "semantic-ui-react"; //Import various semantic-ui-react elements so they can be used.

//The UsersTable class extends React.Component in order to be react component.
export default class UsersTable extends React.Component<{}, {

  //Define the state and their types.
    loading: boolean; //Determines if a page is currently loading or has loaded.
    users: User[], //This will hold an Array of User objects that will be extracted from the backend database.
    newUser: User, //This will be used to store user details when creating a new user.
    updatedUser: User //This will be used to store user details when updating an existing user.
}> {

    //A variable that will be assigned to an instance of the UserService class
    private userService: UserService = new UserService();

    //set the initial state
    public state = {
        loading: false,
        users: [],
        newUser: {email: '', username: '', password: ''},
        updatedUser: {id: 0, email: '', username: '', password: ''}
    };

    //This is a special react method that runs before the page is rendered it sets the state and extracts / loads data.
    public componentDidMount(): void
    {
        //First set the state that needs to be set.
        this.setState({
            loading: true, //the loading state should be set to true as loading commences before the page is rendered.
            users: [] //The user list should be reset to an empty array before rendering so fresh data can be extracted.
        });

        /**
         * We extract all of the users from the backend database with the UserService and assign each to a new users
         * array and then call the onDataLoaded method in which we supply the new users array.
         */
        this.userService
            .getAllUsers()
            .subscribe((users: User[]) => {
                this.onDataLoaded(users)
            });
    }

    //Updates the state, ready for the page to be rendered to the user.
    public onDataLoaded(users: User[])
    {
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
    public render(): React.ReactNode
    {
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

    /*------------------------------------------------------------------METHODS THAT GENERATE HTML---------------------------------------------------------*/

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
                        <button className={"positive ui button"} onClick={() => this.addUser(this.state.newUser)}>Add
                        </button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        );
    }

    /**
     * Method returns a semantic-ui-react form.
     *
     * Each input field will have an initial value of the updatedUser state captured from the user table when
     * the modify button is pressed.
     *
     * The onChange method for each input maps to an external function that captures the new input to update
     * the updatedUser state.
     *
     * The submit button calls the updateUser method provided with the new updatedUser state.
     *
     * @return a semantic-ui-react form with pre-populated input fields based on data from the user table.
     */
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

    /*------------------------------------------------------------------METHODS THAT CAPTURE INPUT FOR onChange---------------------------------------------------------*/


    /*-----METHODS THAT CAPTURE INPUT TO CREATE A NEW USER-----*/


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

    /*-----METHODS THAT CAPTURE INPUT TO UPDATE AN EXISTING USER-----*/

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

    private populateForm(user: User) {
        const updatedUser = this.state.updatedUser; //Variable that is assigned to the current state of the updatedUser
        updatedUser.id = user.id;
        updatedUser.username = user.username;
        updatedUser.email = user.email;
        updatedUser.password = user.password;
        this.setState({updatedUser: updatedUser});

    }

    private deleteUser(userId: number) {
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

    private addUser(userToAdd: User) {
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
}