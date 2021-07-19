import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import styled from 'styled-components'

import fbLogo from '../assets/fb-logo.svg'

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
   return (
      <Container className="">
         <Row className="flex-column justify-content-around" style={{height: "100vh"}}>
            <Col md={9} className="w-100" style={{height: "max-content"}}>
               <Container>
                  <Row>
                     <Col md={6}>
                        <img src={fbLogo} height="120" />
                        <h4>Connect with friends and the world around you on Facebook.</h4>
                     </Col>
                     <Col md={6}>
                        <LoginCard className="mx-5 py-2">
                           <Card.Body>
                              <Form className="text-center">
                                 <Form.Group className="my-3">
                                    <input type="text" className="form-control" placeholder="Email or Phone Number" />
                                 </Form.Group>
                                 <Form.Group className="my-3">
                                    <input type="password" className="form-control" placeholder="Password" />
                                 </Form.Group>
                                 <button className="btn btn-primary btn-lg w-100">Log In</button>
                                 <a href="#" className="text-decoration-none py-2 d-inline-block"><small>Forgot Password?</small></a>
                                 <hr className="my-4" />
                                 <SignUpButton className="btn btn-success py-3 px-4">
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
   );
}

export default Login;
