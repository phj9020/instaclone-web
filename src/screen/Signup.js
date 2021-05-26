import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import BottomBox from "../components/auth/BottomBox";
import {FatLink} from "../components/shared";
import PageTitle from '../components/PageTitle';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Subtitle = styled(FatLink)`
    text-align: center;
    margin: 15px 0px;
    line-height: 1.5;
`
const SocialButton = styled.button`
    all: unset;
    width: 100%;
    border: 1px solid ${(props)=> props.theme.borderColor};
    padding: 8px 0px;
    text-align: center;
    background-color: ${(props)=> props.theme.accent};
    color: white;
    margin-bottom: 15px;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: 600;
    transition: 0.3s opacity ease-in-out;
`

const Terms = styled.p`
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: rgb(142, 142, 142);
    line-height:1.5;
`

function Signup() {
    return (
        <AuthLayout>
            <PageTitle title="Sign up | Instaclone" />
            <FormBox>
                <HeaderContainer>
                    <img src="/img/Instagram_logo.svg" alt="instagram-logo"/>
                    <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
                </HeaderContainer>
                <SocialButton>
                <FontAwesomeIcon icon={faFacebookSquare} size="lg" style={{color: "white", marginRight:"5px"}} />
                    Log in With Facebook
                </SocialButton>
                <Seperator />
                <form>
                    <Input type="email" placeholder="Email" />
                    <Input type="text" placeholder="Full Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="current-password" placeholder="Password" />
                    <Button type="submit" value="Sign up" />
                </form>
                <Terms>By Signing up, you agree toour Terms, Data Policy and Cookies Policy</Terms>
            </FormBox>
            <BottomBox message="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    )
}

export default Signup;
