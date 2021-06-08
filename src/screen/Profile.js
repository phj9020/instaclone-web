import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";
import {PHOTO_FRAGMENT} from "../fragments";
import styled from "styled-components";
import PageTitle from '../components/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';

const ProfileContainer = styled.div``

const ProfileTop = styled.div`
    display: flex;
    margin-bottom: 50px;
`

const ProfileAvatar = styled.div`
    min-width: 200px;
    width:30%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15%;
`

const Avatar = styled.div`
    width: 200px;
    height: 200px;
    border-radius:50%;
    overflow: hidden;

    img {
        width: 100%;
        object-fit: contain;
    }
`

const ProfileInfo = styled.div`
    width: 70%;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Row = styled.div`
    display: flex;
    margin: 10px 0px;
    span {
        display: flex;
        &:not(:last-child) {
            margin-right: 20px;
        }
    }
`
const Username = styled.p`
    font-size: 22px;
    font-weight: 600;
`

const Value = styled.div`
    font-weight: 600;
    margin-right: 5px;
`

const Name = styled.p`
    font-size: 22px;
    font-weight: 500;
`
const Bio = styled.p`
    font-weight: 500;
    font-size: 16px;
`
const ProfileFeed = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 290px;
    gap:2%;
    padding-bottom: 100px;

    @media (max-width:930px) {
        grid-auto-rows: 250px;
    }
    @media (max-width:630px) {
        grid-auto-rows: 150px;
    }
`
const Photo = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    position:relative;
`

const Icons = styled.div`
    width:100%;
    height:100%;
    position: absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    color:white;
    opacity:0;
    transition: opacity 0.3s ease-in-out;
    &:hover {
        opacity: 1;
    }
`
const Icon = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    svg {
        font-size:14px;
        margin-right: 5px;
    }
`

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
        <ProfileContainer>
            <PageTitle title={username} />
            <ProfileTop>
                <ProfileAvatar>
                    <Avatar>
                        {data?.seeProfile?.avatar === null ? <img src={"/img/profile.jpg"} alt="defaultprofile" /> : <img src={data?.seeProfile?.avatar} alt="profile" /> }
                    </Avatar>
                </ProfileAvatar>
                <ProfileInfo>
                    <Row>
                        <Username>{data?.seeProfile?.username}</Username>
                    </Row>
                    <Row>
                        <span>
                            <Value>{data?.seeProfile?.totalFollowers}</Value> 
                            Followers
                        </span>
                        <span>
                            <Value>{data?.seeProfile?.totalFollowings}</Value> 
                            Followings
                        </span>
                    </Row>
                    <Row>
                        <Name>
                            {data?.seeProfile?.firstName}
                            {" "}
                            {data?.seeProfile?.lastName}
                        </Name>
                    </Row>
                    <Row>
                        <Bio>{data?.seeProfile?.bio}</Bio>
                    </Row>
                </ProfileInfo>
            </ProfileTop>
            <ProfileFeed>
                {data?.seeProfile?.photos?.map(item => 
                    <Photo key={item.id} bg={item.file}>
                        <Icons>
                            <Icon>
                                <FontAwesomeIcon icon={faHeart} />
                                {item.likes}
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faComment} />
                                {item.commentNumber}
                            </Icon>
                        </Icons>
                    </Photo>
                )}
            </ProfileFeed>
        </ProfileContainer>
    )
}

export default Profile
