import React from 'react';
import styled from "styled-components";

const StyledInput = styled.input`
    width:100%;
    padding: 10px 7px;
    background-color: #fafafa;
    border: 0.5px solid ${(props) => props.theme.borderColor};
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

function Input(props) {
    return (
        <StyledInput {...props} />
    )
}

export default Input;
