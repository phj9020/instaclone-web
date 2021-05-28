import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from "styled-components";
import { useReactiveVar } from '@apollo/client';
import {isLoggedInVar} from "../apollo";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import routes from "../routes";
import useUser from "../hooks/useUser";

const StyledHeader = styled.header`
    width: 100%;
    padding: 12px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.boxColor};
    border-bottom: 1px solid ${props => props.theme.borderColor};
`

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Column = styled.div``

const Icon = styled.span`
    margin-left: 15px;
`
const Button = styled.span`
    background-color: ${props => props.theme.accent};
    border-radius: 4px;
    padding: 5px 15px;
    color: white;
    font-weight:600;

`


function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const loggedInUser = useUser();

    return (
        <StyledHeader>
            <Wrapper>
                <Column>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </Column>
                <Column>
                    {isLoggedIn ? 
                        <>
                            <Icon>
                                <FontAwesomeIcon icon={faHome} size="lg" />
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faCompass} size="lg" />
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </Icon>
                        </>
                        : 
                        <Link to={routes.home} >
                            <Button>Login</Button>
                        </Link>
                    }
                </Column>
            </Wrapper>
        </StyledHeader>
    )
}

export default Header;
