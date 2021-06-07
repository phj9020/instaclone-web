import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FatText } from '../shared';
import Avatar from "../Avatar";
import { gql, useMutation } from '@apollo/client';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const PhotoContainer = styled.div`
    background-color: ${props => props.theme.boxColor};
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 50px;
    max-width:615px;
    width: 100%;
`

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;

    a {
        color: inherit;
        cursor: pointer;
    }
`

const Username = styled(FatText)`
    margin-left: 15px;
`

const PhotoFile = styled.img`
    width: 100%;
`

const PhotoData = styled.div`
    padding: 10px 16px;
`

const PhotoActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items : center;

    div {
    display: flex;
    align-items: center;
    }

    svg {
        font-size: 20px;
    }
`

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
`

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`

function Photo({id, user, file, isLiked, likes, caption, commentNumber, comments}) {
    
    const updateToggleLike = (cache, result)=> {
        const { data : { toggleLike : {ok}}} = result;
        if(ok) {

            const fragmentId = `Photo:${id}`;
            // const fragment = gql`
            //     # fragment name on __typename
            //     fragment BSName on Photo {
            //         isLiked,
            //         likes
            //     }
            // `;
            /* CASE3 : modify cache : better way and Dont need fragment */
            cache.modify({
                id: fragmentId,
                fields:{
                    isLiked(prev) {
                        return !prev
                    },
                    likes(prev) {
                        if(isLiked){
                            return prev - 1;
                        }
                        return prev + 1;
                    }
                }
            })
            /*  
            // CASE1 : read and Update Fragment if isLiked and likes doesnt exist  
            const result = cache.readFragment({
                id:fragmentId,
                fragment: fragment,  
            })

            if("isLiked" in result && "likes" in result) {
                const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
                // write Fragment
                cache.writeFragment({
                    id: fragmentId,
                    fragment: fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
                    }
                })
            }
            */

            // CASE 2 : update cache : using cache
            /*
            cache.writeFragment({
                // fragment id & fragment 
                id: fragmentId,
                fragment: fragment,
                data: {
                    // isLiked 필드에 prop에서 받아온 isLiked의 반대값을 설정
                    isLiked: !isLiked,
                    likes: isLiked ? likes - 1 : likes + 1,
                },
            });
            */
        };
    };
    
    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id: id
        },
        update: updateToggleLike,
    });

    console.log(comments)
    
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Link to={`/users/${user.username}`}>
                    <Avatar url={user.avatar} lg={true} />
                </Link>
                <Link to={`/users/${user.username}`}>
                    <Username>{user.username}</Username>
                </Link>
            </PhotoHeader>
            <PhotoFile src={file} alt="insta post" />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLike}>
                            <FontAwesomeIcon icon={isLiked  ? SolidHeart : faHeart} style={{color: isLiked ? "#e74e5f" : "inherit"}} /> 
                        </PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faComment} /></PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faPaperPlane} /></PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 like" : `${likes} likes` }</Likes>
                <Comments photoId={id} comments={comments} author={user.username} caption={caption} commentNumber={commentNumber} />
            </PhotoData>
        </PhotoContainer>
    )
}


Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired, 
    likes: PropTypes.number.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,
}

export default Photo;
