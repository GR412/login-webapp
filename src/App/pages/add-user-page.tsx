import * as React from "react";
import AddUserForm from "../components/AddUserForm";


export default class AddUserPage extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="wrapper">
                <div className="title-banner">
                    <h3>Add User Form</h3>
                </div>
                <AddUserForm/>
            </div>
        );
    }
}