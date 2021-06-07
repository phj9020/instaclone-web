import React from 'react';
import PageTitle from '../components/PageTitle';
import { useQuery, gql } from '@apollo/client';
import Photo from '../components/feed/Photo';
import {PHOTO_FRAGMENT,COMMENT_FRAGMENT} from "../fragments";

const FEED_QUERY = gql`
    query seeFeed($page: Int!) {
        seeFeed(page: $page) {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            createdAt
            isMine
            comments {
                ...CommentFragment
            }
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`
function Home() {
    
    const {data} = useQuery(FEED_QUERY, {
        variables: {
            page:1
        }
    });

    console.log(data);

    return (
        <div>
            <PageTitle title="Home" />
            {data?.seeFeed?.map(photo => 
                <Photo key={photo.id} {...photo} />
            )}
        </div>
    )
}

export default Home
