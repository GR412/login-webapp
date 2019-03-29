import * as React from 'react';
import Header from "./components/Header";
import './App.css';
import HomePage from "./pages/home-page";
import {BrowserRouter as Router, Route} from "react-router-dom";
import UpdateUserPage from "./pages/update-user-page";
import AddUserPage from "./pages/add-user-page";
import LoginPage from "./pages/login-page";

export default class App extends React.Component {

    public render() {
        return (
            <div className="App">
                <div className="Page-Content">
                    <Router>
                        <Header/>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/add-user" component={AddUserPage}/>
                            <Route exact path="/update-user/:userId" component={UpdateUserPage}/>
                            <Route exact path="/login" component={LoginPage}/>
                    </Router>
                </div>
            </div>
        );
    }

}
