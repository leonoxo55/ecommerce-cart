import React from 'react';
import { Container, Navbar, Nav} from 'react-bootstrap';
import {ReactComponent as Logo} from '../../assets/svg/logo.svg';

import './TopMenu.scss';

export default function TopMenu() {


    return(
        <Navbar bg='dark' variant='dark' className='top-menu' >
            <Container>
                <BrandNav />
                {/*Menu*/ }
                {/*Cart*/ }
            </Container>
        </Navbar>
    );
}

function BrandNav() {
    return (
    <Navbar.Brand> 
        <Logo />
        <h2>La casa de los helados</h2>
    </Navbar.Brand>
    )
}