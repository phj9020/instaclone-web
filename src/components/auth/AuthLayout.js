import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
    
`

function AuthLayout({children}) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    )
}

export default AuthLayout;
