import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Comment from "./Comment";
import {useForm} from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import useUser from '../../hooks/useUser';

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

const CreateCommentContainer = styled.div`
    margin-top: 10px;

    form {
        input {
            width:100%;
            padding:5px 0px;
        }
    }
`

const CREATE_COMMENT_MUTATION= gql`
    mutation createComment($photoId: Int!, $payload:String!) {
        createComment(photoId: $photoId, payload: $payload) {
            ok
            error
            id
        }
    }
`;

function Comments({photoId, comments, author, caption, commentNumber}) {
    const { register, handleSubmit, setValue, getValues } = useForm();
    // get user data
    const {data: userData} = useUser();

    const createCommentUpdate = (cache, result) => {
        // get value from form
        const {payload} = getValues();
        setValue("payload", "");
        const { data : { createComment : {ok, id}}} = result;
        
        if(ok && userData?.me) {
            // create new fake comment object
            const newComment = {
                __typename: "Comment",
                createdAt: Date.now() + "",
                id: id,
                isMine: true,
                payload: payload,
                user: {
                    ...userData.me
                }
            };
            // create real comment in the cache
            const newCacheComment = cache.writeFragment({
                data: newComment,
                fragment: gql`
                    fragment BSName on Comment {
                        id
                        createdAt
                        isMine
                        payload
                        user {
                            username
                            avatar
                        }
                    }
                `
            });

            // cache update in Photo - make it realtime
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    commentNumber(prev) {
                        return prev + 1
                    },
                    comments(prev) {
                        return [...prev, newCacheComment]
                    }
                }
            })
        }
    };

    const [createComment, {loading}] = useMutation(CREATE_COMMENT_MUTATION, {
        update: createCommentUpdate,
    });


    const onValid = (data) => {
        const {payload} = data;
        if(loading) {
            return;
        }
        createComment({
            variables:{
                photoId, 
                payload,
            }
        });
        
    };
    return (
        <CommentsContainer>
                <Comment author={author} payload={caption} />
                <CommentCount>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
                {comments?.map(item => 
                    <Comment key={item.id} id={item.id} photoId={photoId} isMine={item.isMine} author={item.user.username} payload={item.payload} />
                )}
                <CreateCommentContainer>
                    <form onSubmit={handleSubmit(onValid)}>
                        <input {...register("payload",{required:true})} type="text" placeholder="write a comment" />
                    </form>
                </CreateCommentContainer>
        </CommentsContainer>
    )
}

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
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
