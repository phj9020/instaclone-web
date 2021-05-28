import React from 'react';
import styled from "styled-components";

const StyledNotification = styled.p`
    color: #2ecc71;
    margin: 10px 0px;
`

function Notification({message}) {
    return (
        message === "" || !message ? null :
        <StyledNotification>
            {message}
        </StyledNotification>
    )
}

export default Notification;
