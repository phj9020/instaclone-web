import React from 'react';
import styled from "styled-components";

const StyledAvatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #2c2c2c;
    overflow: hidden;
    img {
        width: 100%;
        object-fit: contain;
    }
`

function Avatar({url}) {
    return (
        <StyledAvatar>
            {url !== null ?  <img src={url} alt="avatar" /> : null }
        </StyledAvatar>
    )
}

export default Avatar
