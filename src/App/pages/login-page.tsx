import * as React from "react";
import TitleBanner from "../components/TitleBanner";
import LoginForm from "../components/LoginForm";


export default class LoginPage extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="form-wrapper">
                <TitleBanner title="Login to view the homepage"/>
                <LoginForm/>
            </div>
        );
    }
}