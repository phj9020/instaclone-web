import React from 'react';
import { logUserOut } from '../apollo';
import PageTitle from '../components/PageTitle';

function Home() {
    return (
        <div>
            <PageTitle title="Home" />
            <h1>Home: Welcome</h1>
            <button onClick={logUserOut}>Log out</button>
        </div>
    )
}

export default Home
