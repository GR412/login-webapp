import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
//import {Form, Table} from "semantic-ui-react";

export default class UpdateUserForm extends React.Component<{}, {
    loading: boolean;
}> {

    private userService: UserService = new UserService();

    public state = {
        loading: false,
        users: [],
        newUser: {email: '', username: '', password: ''},
        updatedUser: {email: '', username: '', password: ''}
    };

    public componentDidMount(): void {
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
    }

    public render(): React.ReactNode {
        return (
            <div className = "table">
                <p>Loading: {this.state.loading}</p>
                {this.renderTableHeader()}
            </div>
        );
    }

    private renderTableHeader()
    {
        return (

            <form className="ui form">
                <div className="field">
                    <label>First Name</label>
                    <input type="text" name="first-name" placeholder="First Name" />
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input type="text" name="last-name" placeholder="Last Name" />
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input type="checkbox" tabIndex={0} className="hidden" />
                        <label>I agree to the Terms and Conditions</label>
                    </div>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>

        );
    }

}