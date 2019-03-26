import * as React from "react";
import AddUserForm from "../components/AddUserForm";
import TitleBanner from "../components/TitleBanner";


export default class AddUserPage extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="wrapper">
                <TitleBanner title="Add User Form"/>
                <AddUserForm/>
            </div>
        );
    }
}