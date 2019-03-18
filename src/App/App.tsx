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
                    <UsersTable/>
                    <UpdateUserForm/>
                </div>
            </div>
        );
    }
}

export default App;
