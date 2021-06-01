import React from 'react';
import PageTitle from '../components/PageTitle';
import { useQuery, gql } from '@apollo/client';
import Photo from '../components/feed/Photo';

const FEED_QUERY = gql`
    query seeFeed($page: Int!) {
        seeFeed(page: $page) {
            id
            user {
                username
                avatar
            }
            file
            caption
            likes
            comments
            createdAt
            isMine
            isLiked
        }
    }
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
