import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from 'prop-types';

const CommentContainer = styled.div``

const CommentCaption = styled.span`
    margin-left: 10px;
`

function Comment({author, payload}) {
    // to do : make it hash tag 
    // to do : delete comment if isMine is true


    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption>{payload}</CommentCaption>
        </CommentContainer>
    )
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string,
}

export default Comment
