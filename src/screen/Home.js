import React from 'react';
import { logUserOut } from '../apollo';
import PageTitle from '../components/PageTitle';
import { useHistory } from "react-router-dom";


function Home() {
    // to clear location.state in Login
    const history = useHistory();
    history.replace();

    return (
        <div>
            <PageTitle title="Home" />
            <h1>Home: Welcome</h1>
            <button onClick={logUserOut}>Log out</button>
        </div>
    )
}

export default Home
