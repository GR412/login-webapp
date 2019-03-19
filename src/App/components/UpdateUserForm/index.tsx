import * as React from "react";
import "./index.css";
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import {Form, Checkbox, Button} from "semantic-ui-react";

export default class UpdateUserForm extends React.Component<{}, {
    loading: boolean;
}> {

    private userService: UserService = new UserService();

    public state = {
        loading: false,
        users: [],
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
            <div className= "main">
                    {this.renderUserUpdateForm()}
             </div>
        );
    }

    private renderUserUpdateForm()
    {
        return (
            <Form>
                <Form.Field>
                    <label>Username:</label>
                    <input placeholder='Username'  className="input"/>
                </Form.Field>
                <Form.Field>
                    <label>Email:</label>
                    <input placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Password:</label>
                    <input placeholder='Password' />
                </Form.Field>
                <Button className={"primary ui button"} type='submit'>Submit</Button>
            </Form>

        );
    }

}