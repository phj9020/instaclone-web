import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from "styled-components";

const StyledAvatar = styled.div`
    width: ${props => props.lg ? "32px" : "27px"};
    height: ${props => props.lg ? "32px" : "27px"};
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    img {
        width: 100%;
        object-fit: contain;
    }
`

function Avatar({url, lg = false}) {
    return (
        <StyledAvatar lg={lg}>
            {url !== null ?  <img src={url} alt="avatar" /> : <FontAwesomeIcon icon={faUserCircle} size="2x" /> }
        </StyledAvatar>
    )
}

export default Avatar
