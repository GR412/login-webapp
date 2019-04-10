import * as React from "react";
import UpdateUserForm from "../components/UpdateUserForm";
import TitleBanner from "../components/TitleBanner";

/**
 * This class is a page-component that renders the TitleBanner and UpdateUserForm components. This component is also attached to a URL
 * route for navigation purposes.
 */
export default class UpdateUserPage extends React.Component
{
    /**
     * This is a special React method that renders the given components to the page.
     *
     * @return a div containing components to be displayed to the page.
     */
    public render() {
        return (
            <div className="wrapper">
                <TitleBanner title="Update User Form"/>
                <UpdateUserForm/>
            </div>
        );
    }
}