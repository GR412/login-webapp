import * as React from "react";
import UsersTable from "../components/UsersTable";
import TitleBanner from "../components/TitleBanner";

/**
 * This class is a page-component that renders the TitleBanner and the UsersTable components. This component is also attached to a URL
 * route for navigation purposes.
 */
export default class HomePage extends React.Component
{
    /**
     * This is a special React method that renders the given components to the page.
     *
     * @return a div containing components to be displayed to the page.
     */
    public render() {
        return (
            <div className="wrapper">
                <TitleBanner title="User Table"/>
                <UsersTable/>
            </div>
        );
    }

}