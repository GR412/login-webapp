import * as React from "react";
import TitleBanner from "../components/TitleBanner";
import LoginForm from "../components/LoginForm";

/**
 * This class is a page-component that renders the TitleBanner and LoginForm components. This component is also attached to a URL
 * route for navigation purposes.
 */
export default class LoginPage extends React.Component {

    /**
     * This is a special React method that renders the given components to the page.
     *
     * @return a div containing components to be displayed to the page.
     */
    public render() {
        return (
            <div className="form-wrapper">
                <TitleBanner title="Login to view the homepage"/>
                <LoginForm/>
            </div>
        );
    }
}