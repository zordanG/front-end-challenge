import React, { useState } from 'react';
import { 
    Navbar as ReactstrapNavbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse
} from 'reactstrap';

import './index.css';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <ReactstrapNavbar color="light" light expand="md">
            <NavbarBrand>Qualyteam Challenge</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/list"> 
                            Master List
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </ReactstrapNavbar>
    );
}