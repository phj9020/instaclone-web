import React from 'react';
import styled from "styled-components";

const StyledButton = styled.input`
    cursor: pointer;
    text-align: center;
    background-color: ${(props)=> props.theme.accent};
    margin-top: 10px;
    color: white;
    border: none;
    font-weight: 600;
    transition: 0.3s opacity ease-in-out; 
    padding: 10px 7px;
    opacity: ${props => props.disabled ? 0.3 : 1}
`


function Button(props) {
    return (
        <StyledButton {...props} />
    )
}

export default Button;
