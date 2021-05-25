import React from 'react';
import styled from "styled-components";
import {BaseBox} from "../shared";

// extends from BaseBox
const TopBox = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 34px 42px 25px 42px;
    margin-bottom: 10px;

    img {
        width: 175px;
        object-fit: contain;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 20px 0px;
    }
`

function FormBox({children}) {
    return (
        <TopBox>
            {children}
        </TopBox>
    )
}

export default FormBox;
