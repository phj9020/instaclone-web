import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FatText } from '../shared';
import Avatar from "../Avatar";
import { gql, useMutation } from '@apollo/client';

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

function Photo({id, user, file, isLiked, likes}) {
    const [toggleLike, {loading}] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id: id
        }
    });


    
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar url={user.avatar} lg={true} />
                <Username>{user.username}</Username>
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
    likes: PropTypes.number.isRequired
}

export default Photo;
