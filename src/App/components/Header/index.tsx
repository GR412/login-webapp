import * as React from "react";
import "./index.css";
import Navigation from "../Navigation";

/**
 * This component displays the header content above all of the page-components.
 */

export default class Header extends React.Component
{
    /**
     * This is a special React method that renders the given components to the page. In this case the header contains
     * a semantic-ui icon a title and a Navigation component.
     *
     * @return a header html tag containing the title and icon. A navigation component is also rendered in the header.
     */

    public render(): React.ReactNode
    {
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