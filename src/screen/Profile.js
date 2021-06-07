import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";
import {PHOTO_FRAGMENT} from "../fragments";

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username:$username) {
                firstName
                lastName
                username
                bio
                avatar
                photos(page: 1) {
                    ...PhotoFragment
                }
                totalFollowers
                totalFollowings
                isMe
                isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

function Profile() {
    const {username} = useParams();
    const {data} = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username: username
        }
    });
    console.log(data)
    
    return (
        <div>
            profile
        </div>
    )
}

export default Profile
