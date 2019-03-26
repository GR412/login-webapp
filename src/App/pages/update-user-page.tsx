import * as React from "react";
import UpdateUserForm from "../components/UpdateUserForm";
import TitleBanner from "../components/TitleBanner";

export default class UpdateUserPage extends React.Component {

    public render() {
        return (
            <div className="wrapper">
                <TitleBanner title="Update User Form"/>
                <UpdateUserForm/>
                </div>

        );
    }

}