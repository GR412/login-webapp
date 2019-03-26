import * as React from "react";
import {NavLink} from "react-router-dom";
import "./index.css";

export default class Navigation extends React.Component {

    public render() {
        return (
                <nav>
                    <NavLink exact to="/" activeClassName="active">Home page</NavLink>
                    <NavLink to="/add-user" activeClassName="active">Add user</NavLink>
                </nav>
        );
    }

}