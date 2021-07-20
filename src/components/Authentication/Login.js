import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Alert, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import fbLogo from '../../assets/fb-logo.svg'

import SignUpModal from './SignUpModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import { useAuth } from '../../context/AuthContext'

const LoginCard = styled(Card)`
   width: 70%;
   border-radius: 1em;
   border: none;
   box-shadow: 0px 2px 8px #0000001f;
`

const SignUpButton = styled.a`
   background-color: #55bf3c;
   border: none;
   font-weight: 800;
`

const Login = () => {
   const [ showSignup, setShowSignup ] = useState(false)
   const [ showForgotPassword, setShowForgotPassword ] = useState(false)
   const [ error, setError ] = useState('')
   const [ loading, setLoading ] = useState(false) 
   const emailRef = useRef()
   const passwordRef = useRef()
   const { login } = useAuth()

   const history = useHistory()

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         setError('')
         setLoading(true)
         await login(emailRef.current.value, passwordRef.current.value)
         history.push('/')
      } catch (err) {
         console.log(err)
         setError('Failed to Login')
      }
      setLoading(false)
   }

   return (
      <>
         <Container>
            <Row className="flex-column justify-content-around" style={{height: "100vh"}}>
               <Col md={9} className="w-100" style={{height: "max-content"}}>
                  <Container>
                     <Row>
                        <Col lg={6} md={12} className="text-center">
                           <img src={fbLogo} height="120" />
                           <h4>Connect with friends and the world around you on Facebook.</h4>
                        </Col>
                        <Col lg={6} md={12}>
                           <LoginCard className="py-2" style={{margin: "0 auto"}}>
                              <Card.Body>
                                 <Form className="text-center" onSubmit={handleSubmit}>
                                    {error && (<Alert variant="danger">{error}</Alert>)}
                                    <Form.Group className="my-3">
                                       <input ref={emailRef} type="text" className="form-control" placeholder="Email or Phone Number" />
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                       <input ref={passwordRef} type="password" className="form-control" placeholder="Password" />
                                    </Form.Group>
                                    <button className="btn btn-primary btn-lg w-100">Log In</button>
                                    <a href="#" onClick={() => setShowForgotPassword(true)} className="text-decoration-none py-2 d-inline-block"><small>Forgot Password?</small></a>
                                    <hr className="my-4" />
                                    <SignUpButton className="btn btn-success py-3 px-4" onClick={() => setShowSignup(true)}>
                                       <h5 className="my-0">Create New Account</h5>
                                    </SignUpButton>
                                 </Form>
                              </Card.Body>
                           </LoginCard>
                        </Col>
                     </Row>
                  </Container>
               </Col>
            </Row>
         </Container>
         <SignUpModal show={showSignup} handleClose={() => setShowSignup(false)} />
         <ForgotPasswordModal show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />
      </>
   );
}

export default Login;
