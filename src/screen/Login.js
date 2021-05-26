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
import PageTitle from '../components/PageTitle';
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

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
    
    const {register, handleSubmit, formState :{errors, isValid}} = useForm({mode: "onChange"});
    const onSubmitValid = data => {

        console.log("valid", data);
    }

    
    console.log("errors", errors)
    console.log("isValid", isValid)
    return (
        <AuthLayout>
            <PageTitle title="Log in" />
            <FormBox>
                <img src="/img/Instagram_logo.svg" alt="instagram-logo"/>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <FormError message={errors?.username?.message} />
                    <Input {...register("username", { 
                        required: "username is required", 
                        minLength: {value: 6, message:"Username should be longer than 6 characters"} 
                        })}  
                        type="text" 
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)}
                        />
                    <FormError message={errors?.password?.message} />
                    <Input {...register("password", 
                    { required: "password is required", 
                    minLength: {value: 3, message:"Password should be longer than 3 characters"} 
                    })} 
                        type="password" 
                        autoComplete="off" 
                        placeholder="Password" 
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <Button type="submit" value="Log in"  disabled={!isValid} />
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
