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
   }, [])

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
         <CustomNavbar expand="lg" className="py-0">
            <Container fluid>
               <Navbar.Brand><img src={fbLogoBadge} width="50" alt="f Badge" /></Navbar.Brand>
               <Form>
                  <SearchBox type="text" placeholder="Search Facebook" />
               </Form>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                     <Nav.Link>Newsfeed</Nav.Link>
                     <Nav.Link>Watch</Nav.Link>
                     <Nav.Link>Marketplace</Nav.Link>
                     <Nav.Link>Groups</Nav.Link>
                     <Nav.Link>Gaming</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
         
               <Nav className="d-flex flex-row justify-content-between">
                  <Nav.Link>{email}</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
               </Nav>
            </Container>
         </CustomNavbar>
         {error && (<Alert variant="danger">{error}</Alert>)}
      </>
   );
}

export default HeaderNav;
