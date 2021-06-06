import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import {Link, useLocation} from "react-router-dom";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from '../components/PageTitle';
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { useMutation, gql } from '@apollo/client';
import {logUserIn} from "../apollo";
import Notification from "../components/auth/Notification";

const StyledInput = styled.input`
    width:100%;
    padding: 10px 7px;
    background-color: #fafafa;
    border: 0.5px solid ${(props) => props.hasError ? "red" : props.theme.borderColor};
    border-radius: 5px;
    box-sizing: border-box;
    color: black;
    
    &::placeholder{
        font-size: 12px;
    }

    &:not(:last-child) {
        margin-bottom: 5px;
    }

    &:focus {
        border-color: ${(props)=> props.theme.accent};
    }
`
const FacebookLogin = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        color: #385285;
        margin-left: 5px;
    }
`

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`



function Login() {
    const location = useLocation();
    const {register, handleSubmit, formState :{errors, isValid}, getValues, setError, clearErrors} = useForm({
        mode: "onChange", 
        defaultValues:{
            username: location?.state?.username || "",
            password: location?.state?.password || "",
        }
    });
    
    const [login, {loading}] = useMutation(LOGIN_MUTATION, {
        // to find out whether mutation started or finished 
        onCompleted: (data) => { 
            const {login : {ok, token, error}} = data;
            if(!ok) {
                return setError("result", {
                    message: error
                })
            };
            if(token) {
                logUserIn(token);
            };
        }
    });

    const onSubmitValid = () => {
        if(loading) {
            return;
        };

        // getValues function  get input values from form    
        const {username, password} = getValues();

        // call login function with data variables 
        login({
            variables: {
                username, password
            }
        });
    };


    const clearLoginError = () => {
        clearErrors("result");
    };

    

    return (
        <AuthLayout>
            <PageTitle title="Log in" />
            <FormBox>
                <img src="/img/Instagram_logo.svg" alt="instagram-logo"/>
                <Notification message={location?.state?.message} />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <FormError message={errors?.username?.message} />
                    <StyledInput {...register("username", { 
                        required: "Username is required", 
                        minLength: {value: 6, message:"Username should be longer than 6 characters"} 
                        })}
                        onFocus={clearLoginError}
                        type="text" 
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)}
                        />
                    <FormError message={errors?.password?.message} />
                    <StyledInput {...register("password", {   
                        required: "Password is required", 
                        minLength: {value: 3, message:"Password should be longer than 3 characters"} 
                        })}
                        onFocus={clearLoginError}  
                        type="password" 
                        autoComplete="off" 
                        placeholder="Password" 
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.result?.message} />
                    <Button type="submit" value={loading ? "Loading..." : "Log in"}  disabled={!isValid || loading} />
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
