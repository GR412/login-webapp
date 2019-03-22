import * as React from "react";
import "./index.css";
import Navigation from "../Navigation";

export default class Header extends React.Component {


    public render(): React.ReactNode {
        return (
            <header>
                <h2>
                    <i className="user secret green large icon"/>
                    Login WebApp
                </h2>
                <Navigation/>
            </header>
        );
    }
}