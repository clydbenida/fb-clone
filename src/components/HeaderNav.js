import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Form, Alert } from 'react-bootstrap'
import { AiOutlineHome, AiFillShop } from 'react-icons/ai'
import { FaTv } from 'react-icons/fa'
import { RiGamepadLine, RiGroupLine } from 'react-icons/ri'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import fbLogoBadge from '../assets/fb-logo-badge.svg'


const CustomNavbar = styled(Navbar)`
   background-color: white;
   color: #1f1f1f;
   box-shadow: 0px 0px 8px #afafaf
`

const SearchBox = styled(Form.Control)`
   border-radius: 1em;
   border: none;
   background-color: #f1f1f1;
`

const HeaderIcons = styled(Link)`
   border-radius: .25em;
   :hover {
      background-color: #efefef;
   }
`


const HeaderNav = ({ url }) => {
   const { logout, userData, currentUser } = useAuth()
   const [ error, setError ] = useState('')
   const history = useHistory()

   const handleLogout = async (e) => {
      try {
         setError('')
         await logout()
         history.push("/login")
      } catch(err) {
         setError('Something went wrong')
         console.log(err)
      }
   }
   const headerIconSize = 32

   return (
      <>
         <nav className="d-flex align-items-center position-fixed top-0 start-0 mx-3" style={{zIndex: 6}}>
            <Navbar.Brand><img src={fbLogoBadge} width="40" alt="f Badge" /></Navbar.Brand>
            <Form>
               <SearchBox type="text" placeholder="Search Facebook" />
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
         </nav>
         <CustomNavbar expand="lg" fixed='top' className="py-0 w-100 py-1 mb-5" style={{zIndex: 5}}>
            <Container fluid className="justify-content-between align-items-center">
               <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0 my-0 mx-auto">
                  <Nav>
                     <HeaderIcons to="/" className="nav-link px-5"><AiOutlineHome size={headerIconSize} /></HeaderIcons>
                     <HeaderIcons className="nav-link px-5"><FaTv size={headerIconSize} /></HeaderIcons>
                     <HeaderIcons className="nav-link px-5"><AiFillShop size={headerIconSize} /></HeaderIcons>
                     <HeaderIcons className="nav-link px-5"><RiGroupLine size={headerIconSize} /></HeaderIcons>
                     <HeaderIcons className="nav-link px-5"><RiGamepadLine size={headerIconSize} /></HeaderIcons>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </CustomNavbar>
         <Nav className="d-flex flex-row justify-content-between position-fixed top-0 end-0 py-2" style={{zIndex: 6}}>
            <Link className="nav-link" to={`/user/${userData?.uid}`}>{`${userData?.name?.firstName} ${userData?.name?.lastName}`}</Link>
            <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
         </Nav>
         {error && (<Alert variant="danger">{error}</Alert>)}
      </>
   );
}

export default HeaderNav;
