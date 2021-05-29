import styled from "styled-components";

export const BaseBox = styled.div`
    width: 100%;
    background-color: ${(props)=> props.theme.boxColor};
    border: 1px solid rgb(219, 219, 219);
`

export const FatLink = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: rgb(142, 142, 142);
`

export const FatText = styled.span`
    font-weight: 600;
`