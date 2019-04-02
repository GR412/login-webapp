import * as React from "react";
import AddUserForm from "../components/AddUserForm";
import TitleBanner from "../components/TitleBanner";

/**
 * This class is a page-component that renders other components. This component is also attached to a URL
 * route for navigation purposes.
 */

export default class AddUserPage extends React.Component<{}, {}>
{
    /**
     * This is a special React method that renders the given components to the page.
     *
     * @return a div containing components to be displayed to the page.
     */

    public render()
    {
        return (
            <div className="form-wrapper">
                <TitleBanner title="Add User Form"/>
                <AddUserForm/>
            </div>
        );
    }
}