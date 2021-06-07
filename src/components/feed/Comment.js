import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const CommentContainer = styled.div`
    margin-bottom:10px;
    position:relative;
    
    a {
        color: inherit;
        cursor:pointer;
    }
`

const CommentCaption = styled.span`
    margin-left: 10px;

    a {
        background-color:inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`

const DelBtn = styled.button`
    all: unset;
    position:absolute;
    right:0;
    color: red;
    cursor: pointer;

`



const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id:Int!) {
        deleteComment(id:$id) {
            ok
        }
    }
`

function Comment({id, photoId, isMine, author, payload}) {
    // delete comment if isMine is true
    const updateDeleteComment = (cache, result) => {
        const {data : {deleteComment : {ok}}} = result;

        if(ok) {
            // use evict() to delete 
            cache.evict({
                id: `Comment:${id}`
            })
            // modify Photo:id's commentNumber 
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    commentNumber(prev){
                        return prev - 1;
                    }
                }
            })
        }
    };
    
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            id: id,
        },
        update: updateDeleteComment,
    });

    const onDeleteClick = ()=> {
        deleteComment({
            variables:{
                id
            }
        });
    };


    return (
        <CommentContainer>
            <Link to={`/users/${author}`}>
                <FatText>{author}</FatText>
            </Link>
            <CommentCaption>{payload.split(" ").map((word, index) => /#[\w]+/.test(word) ? 
                <React.Fragment key={index}>
                    <Link to={`/hashtags/${word}`}>{word}</Link>{" "} 
                </React.Fragment> 
                :
                <React.Fragment key={index}>
                    {word}{" "}
                </React.Fragment>
                )}
            </CommentCaption>
            {isMine ? <DelBtn onClick={onDeleteClick}><FontAwesomeIcon icon={faTrashAlt}/></DelBtn>: null}
        </CommentContainer>
    )
}

Comment.propTypes = {
    id: PropTypes.number,
    photoId: PropTypes.number,
    isMine: PropTypes.bool,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string,
}

export default Comment
