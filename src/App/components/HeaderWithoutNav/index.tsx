import * as React from "react";
import "./index.css";
import Navigation from "../Navigation";

/**
 * This component displays the header content above the LoginForm component.
 */

export default class HeaderWithoutNav extends React.Component
{
    /**
     * This is a special React method that renders the given components to the page. In this case the header contains
     * a semantic-ui icon a title.
     *
     * @return a header html tag containing the title and icon.
     */

    public render()
    {
        return (
            <div className='headerWithoutNav'>
                <h2>
                    <i className="user secret green large icon"/>
                    Login WebApp
                </h2>
            </div>
        );
    }
}