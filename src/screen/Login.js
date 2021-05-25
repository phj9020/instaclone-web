import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';


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

const WhiteBox = styled.div`
    width: 100%;
    background-color: white;
    border: 1px solid rgb(219, 219, 219);
`

// extends from Whitebox
const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 34px 42px 25px 42px;
    margin-bottom: 10px;

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        margin-top: 35px;

        input {
            width:100%;
            padding: 10px 7px;
            background-color: #fafafa;
            border: 0.5px solid rgb(219,219,219);
            border-radius: 5px;
            box-sizing: border-box;
            
            &::placeholder{
                font-size: 12px;
            }

            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
        input[type="submit"] {
            cursor: pointer;
            text-align: center;
            background-color: #0095f6;
            margin-top: 10px;
            color: white;
            border: none;
            font-weight: 600;

            &:focus {
                opacity: 0.7;
            }
        }
    }
`

const Seperator = styled.div`
    position: relative;
    width : 100%;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-size: 12px;

    &::before {
        content: "";
        position: absolute;
        left:0px;
        top:6px;
        width: 43%;
        height: 1px;
        background-color: rgb(219, 219, 219);
    }
    &::after {
        content: "";
        position: absolute;
        right:0px;
        top:6px;
        width: 43%;
        height: 1px;
        background-color: rgb(219, 219, 219);
    }
`

const FacebookLogin = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        margin-left: 5px;
        color: #385285;
        font-weight: 600;
    }

`

const BottomBox = styled(WhiteBox)`
    padding: 20px 0px;
    text-align: center;
    font-size: 12px;

    a {
        font-weight: 600;
        color: #0095f6;
    }
`



function Login() {

    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="current-password" placeholder="Password" />
                        <input type="submit" value="Log In" />
                    </form>
                    <Seperator>
                        Or
                    </Seperator>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} size="lg" style={{color: "#1f90f2"}} />
                        <a href="/#">Log in With Facebook</a>
                    </FacebookLogin>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account? </span>
                    <a href="/#">Sign Up</a>
                </BottomBox>
            </Wrapper>
        </Container>
    )
}

export default Login
