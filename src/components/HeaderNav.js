import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Form, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import fbLogoBadge from '../assets/fb-logo-badge.svg'


const CustomNavbar = styled(Navbar)`
   background-color: white;
   box-shadow: 0px 0px 8px #afafaf
`

const SearchBox = styled(Form.Control)`
   border-radius: 1em;
   border: none;
   background-color: #f1f1f1;
`


const HeaderNav = () => {
   const { currentUser, logout } = useAuth()
   const [ error, setError ] = useState('')
   const [ email, setEmail ] = useState('')
   const history = useHistory()
   useEffect(() => {
      if (currentUser?.email)
         return setEmail(currentUser.email)
      else
         return setEmail('No user')
   }, [currentUser])

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

   return (
      <>
         <nav className="d-flex align-items-center position-fixed top-0 start-0 mx-3" style={{zIndex: 6}}>
            <Navbar.Brand><img src={fbLogoBadge} width="40" alt="f Badge" /></Navbar.Brand>
            <Form>
               <SearchBox type="text" placeholder="Search Facebook" />
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
         </nav>
         <CustomNavbar expand="lg" className="py-0 position-fixed w-100 py-1 mb-5">
            <Container fluid className="justify-content-between align-items-center">
               <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0 my-0 mx-auto">
                  <Nav>
                     <Nav.Link>Newsfeed</Nav.Link>
                     <Nav.Link>Watch</Nav.Link>
                     <Nav.Link>Marketplace</Nav.Link>
                     <Nav.Link>Groups</Nav.Link>
                     <Nav.Link>Gaming</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </CustomNavbar>
         <Nav className="d-flex flex-row justify-content-between position-fixed top-0 end-0 py-2" style={{zIndex: 6}}>
            <Nav.Link>{email}</Nav.Link>
            <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
         </Nav>
         {error && (<Alert variant="danger">{error}</Alert>)}
      </>
   );
}

export default HeaderNav;
