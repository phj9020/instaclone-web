import React from 'react';
import {useParams} from "react-router-dom";

function Profile() {
    const {username} = useParams();
    
    return (
        <div>
            profile
        </div>
    )
}

export default Profile
