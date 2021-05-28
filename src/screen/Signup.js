import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import BottomBox from "../components/auth/BottomBox";
import {FatLink} from "../components/shared";
import PageTitle from '../components/PageTitle';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router-dom";

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
    color: ${props => props.theme.termsColor};
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

const StyledInput = styled.input`
    width:100%;
    padding: 10px 7px;
    background-color: #fafafa;
    border: 0.5px solid ${(props) => props.hasError ? "red" : props.theme.borderColor};
    border-radius: 5px;
    box-sizing: border-box;
    
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

const Terms = styled.p`
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: ${(props)=> props.theme.termsColor};
    line-height:1.5;
`

const CREATE_ACCOUNT = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!) {
            createAccount(firstName:$firstName, lastName:$lastName, username:$username, email:$email, password:$password) {
                ok
                error
            }
        }
`

function Signup() {
    const history = useHistory();

    const {register, handleSubmit, formState :{errors, isValid}, setError, clearErrors, getValues} = useForm({mode: "onChange"});

    const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT, {
        onCompleted: (data) => {
            const {createAccount : {ok, error}} = data;
            const {username, password} = getValues();

            if(!ok) {
                return setError("result", {
                    message: error
                })
            };
            //redirect user to "/" with data
            history.push(routes.home, {message: "Account Created, Please Log in", username, password} );
        }
    })
    
    const onSubmitValid = (data)=> {
        if(loading) {
            return;
        };

        createAccount({
            variables: {
                ...data
            }
        })

    };

    const clearLoginError = () => {
        clearErrors("result");
    }

    // console.log("errors", errors)
    // console.log("isValid", isValid)

    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
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
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <FormError message={errors?.email?.message} />
                    <StyledInput {...register("email", { required: "Email is required"})} 
                        type="email" placeholder="Email" onFocus={clearLoginError} />
                    <FormError message={errors?.firstName?.message} />
                    <StyledInput {...register("firstName", { required: "Firstname is required"})} 
                        type="text" placeholder="First Name" onFocus={clearLoginError} />
                    <StyledInput {...register("lastName", { })}  
                        type="text" placeholder="Last Name" onFocus={clearLoginError} />
                    <FormError message={errors?.username?.message} />
                    <StyledInput {...register("username", { required: "Username is required", minLength: {value: 6, message:"Username should be longter than 6 characters"}})}  
                        type="text" placeholder="Username" onFocus={clearLoginError} />
                    <FormError message={errors?.password?.message} />
                    <StyledInput {...register("password", { required: "Password is required", minLength: {value: 3, message:"Password should be longter than 3 characters"}})} 
                        type="password" placeholder="Password" onFocus={clearLoginError} autoComplete="off" />
                    <FormError message={errors?.result?.message} />
                    <Button type="submit" value={loading ? "Loading..." : "Sign up"} disabled={!isValid || loading} />
                </form>
                <Terms>By Signing up, you agree toour Terms, Data Policy and Cookies Policy</Terms>
            </FormBox>
            <BottomBox message="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    )
}

export default Signup;
