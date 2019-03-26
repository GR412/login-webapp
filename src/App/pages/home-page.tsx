import * as React from "react";
import UsersTable from "../components/UsersTable";
import TitleBanner from "../components/TitleBanner";

export default class HomePage extends React.Component {

    public render() {
        return (
            <div className="wrapper">
                <TitleBanner title="User Table"/>
                <UsersTable/>
            </div>
        );
    }

}