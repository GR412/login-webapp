import * as React from "react";
import "./index.css";

export default class Header extends React.Component {


    public render(): React.ReactNode {
        return (
            <div className="header">
                <h2>
                    <i className="user secret green large icon"/>
                    Login WebApp
                </h2>
            </div>
        );
    }
}