import React from 'react';
import styled from "styled-components";
import {BaseBox} from "../shared";
import {Link} from "react-router-dom";

const StyledBottomBox = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    font-size: 12px;

    a {
        color: ${(props)=> props.theme.accent};
        margin-left: 5px;
    }
`

function BottomBox({message, link, linkText}) {
    return (
        <StyledBottomBox>
            <span>{message}</span>
            <Link to={link}>{linkText}</Link>
        </StyledBottomBox>
    )
}

export default BottomBox
