import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from "styled-components";
import { useReactiveVar } from '@apollo/client';
import {darkModeVar} from "../../apollo";
import { faMoon,faSun } from '@fortawesome/free-regular-svg-icons';
import {disableDarkMode, enableDarkMode} from "../../apollo";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
    
`

const Footer = styled.footer`
    margin-top: 20px;
`

const DarkModeButton = styled.span`
    cursor: pointer;
`

function AuthLayout({children}) {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
            <Footer>
                <DarkModeButton onClick={darkMode ? disableDarkMode : enableDarkMode}>
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </DarkModeButton>
            </Footer>
        </Container>
    )
}

export default AuthLayout;
