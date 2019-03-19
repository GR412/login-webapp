import * as React from 'react';
import Header from "./components/Header";
import './App.css';
import UsersTable from "./components/UsersTable";
import SingleUserDisplay from "./components/SingleUserDisplay";
import UpdateUserForm from "./components/UpdateUserForm";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Header/>
                <div className="Page-Content">
                    <div className= "wrapper">
                        <div className = "title-banner"><h3>User Table</h3></div>
                            <UsersTable/>
                        <div className = "title-banner"><h3>User Update Form</h3></div>
                            <UpdateUserForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
