import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from "styled-components";

const StyledAvatar = styled.div`
    width: ${props => props.lg ? "30px" : "25px"};
    height: ${props => props.lg ? "30px" : "25px"};
    border-radius: 50%;
    overflow: hidden;
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
