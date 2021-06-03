import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Comment from "./Comment";

const CommentsContainer = styled.div`
    margin-top:10px;
`
const CommentCount = styled.span`
    margin: 10px 0px;
    display: block;
    opacity:0.7;
    font-size: 10px;
    font-weight: 600;
`

function Comments({comments, author, caption, commentNumber}) {
    // to do: form to write comment 

    return (
        <CommentsContainer>
                <Comment author={author} payload={caption} />
                <CommentCount>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
                {comments?.map(item => 
                    <Comment key={item.id} author={item.user.username} payload={item.payload} />
                )}
        </CommentsContainer>
    )
}

Comments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        payload : PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired
        }),
    })),
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,

}

export default Comments;
