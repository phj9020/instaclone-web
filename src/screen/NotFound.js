import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.p`
    font-size:48px;
    font-weight: 800;
`


function NotFound() {
    return (
        <Container>
            <Title>404 Page Not Found</Title>
        </Container>
    )
}

export default NotFound
