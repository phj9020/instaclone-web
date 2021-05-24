import React from 'react';
import { darkModeVar, isLoggedInVar } from '../apollo';
import styled from "styled-components";


const Container = styled.div`
    color: ${(props) => props.theme.fontColor};
`

const Title = styled.h1`
   
`


function Login() {

    return (
        <Container>
            <Title>Login</Title>
            <button onClick={()=> darkModeVar(true)}>Dark Mode</button>
            <button onClick={()=> darkModeVar(false)}>Light Mode</button>
        </Container>
    )
}

export default Login
