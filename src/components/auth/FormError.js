import React from 'react';
import styled from "styled-components";

const ErrorMessage = styled.span`
    color: ${(props)=> props.theme.warningColor};;
    font-size: 10px;
    margin: 5px 0px;
`

function FormError({message}) {
    return (
        message === "" || !message ? null :
        <ErrorMessage>
            {message}
        </ErrorMessage>
    )
}

export default FormError;
