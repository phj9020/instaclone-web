import React from 'react';
import styled from 'styled-components';

const StyledSeperator = styled.div`
    position: relative;
    width : 100%;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 600;
    color: rgb(142, 142, 142);

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

function Seperator() {
    return (
        <StyledSeperator>
            Or
        </StyledSeperator>
    )
}

export default Seperator;
