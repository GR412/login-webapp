import * as React from "react";
import UsersTable from "../components/UsersTable";

export default class HomePage extends React.Component {

    public render() {
        return (
            <div className="wrapper">
                <div className="title-banner">
                    <h3>User Table</h3>
                </div>
                <UsersTable/>
            </div>
        );
    }

}