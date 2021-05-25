import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import BottomBox from "../components/auth/BottomBox";

const FacebookLogin = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        color: #385285;
    }
`

function Login() {

    return (
        <AuthLayout>
            <FormBox>
                <img src="/img/Instagram_logo.svg" alt="instagram-logo"/>
                <form>
                    <Input type="text" placeholder="Username" />
                    <Input type="current-password" placeholder="Password" />
                    <Button type="submit" value="Log in" />
                </form>
                <Seperator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} size="lg" style={{color: "#1f90f2"}} />
                    <Link to="/">Log in With Facebook</Link>
                </FacebookLogin>
            </FormBox>
            <BottomBox message="Don't have an account?" link={routes.signUp} linkText="Sign up" />
        </AuthLayout>
    )
}

export default Login
