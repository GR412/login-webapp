import * as React from "react";
import {Link} from "react-router-dom";

export default class Navigation extends React.Component {

    public render() {
        return (
            <div className="navigation">
                <Link to="/">Home page</Link>
                <Link to="/add-user">Add user</Link>
            </div>
        );
    }

}