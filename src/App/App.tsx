import * as React from 'react';
import Header from "./components/Header";
import './App.css';
import HomePage from "./pages/home-page";
import {BrowserRouter as Router, Route} from "react-router-dom";
import UpdateUserPage from "./pages/update-user-page";
import AddUserPage from "./pages/add-user-page";
import LoginPage from "./pages/login-page";
import {ApiClient} from "./services/ApiClient";

/**
 * This is the main App component that renders all of the different components to form a single page. There is also logic
 * to ensure that a user is restricted to the pages they can view depending on if they're authenticated or not.
 */

export default class App extends React.Component {

    private apiClient: ApiClient = new ApiClient();

    /**
     * This is a special React method that renders the given components to the page. Since this is within the main app
     * component we also need to specify some logic to ensure certain components can't be accessed by an
     * un-authenticated user.
     *
     * @return a div containing calls to other methods that fetch components to be displayed to the page.
     */

    public render() {
        return (
            <div className="App">
                {this.apiClient.isUserLoggedIn() ? this.renderMainApp() : <LoginPage/>}
            </div>
        );
    }

    /**
     * This method returns the header and page-component components that make up the main content of the app.
     *
     * @return a router component that contains components that make up the main content of the app. Page components
     * are attached to a URL route for easier navigation.
     */

    private renderMainApp() {
        return (
            <div className="Page-Content">
                <Router> /*Each page-component will have an associated URL route*/
                    <Header/> /*The Header component will always be shown no matter the page-component currently displayed*/
                    <Route exact path="/" component={HomePage}/> /*Homepage component given the "/" route*/
                    <Route exact path="/add-user"
                           component={AddUserPage}/> /*AddUserPage component given the "/add-user" route*/
                    <Route exact path="/update-user/:userId"
                           component={UpdateUserPage}/> /*UpdateUserPage component given the "/update-user/:userId" route*/
                    <Route exact path="/login" component={LoginPage}/> /*LoginPage component given the "/login" route*/
                </Router>
            </div>
        )
    }

}
