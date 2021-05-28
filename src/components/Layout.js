import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Content = styled.main`
    max-width: 930px;
    width: 100%;
    margin: 0px auto;
    margin-top:30px;
`

function Layout({children}) {
    return (
        <div>
            <Header />
            <Content>
                {children}
            </Content>
        </div>
    )
}

export default Layout;
