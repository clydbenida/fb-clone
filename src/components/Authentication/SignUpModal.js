import React, { useRef, useState } from 'react';
import { Form, Modal, Alert, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import httpClient from '../../lib/httpClient'

const SignUpModal = ({show, handleClose}) => {
   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()
   const firstNameRef = useRef()
   const lastNameRef = useRef()
   const { signup, updateUser } = useAuth()
   const [ error, setError ] = useState('')
   const [ loading, setLoading ] = useState(false)
   const handleSubmit = async (e) => {
      e.preventDefault()

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
         return setError('Passwords do not match')
      }

      try {
         setError('')
         setLoading(true)
         await httpClient.post('/user/create', {
            email: emailRef.current.value, 
            password: passwordRef.current.value, 
            name: {
               firstName: firstNameRef.current.value,
               lastName: lastNameRef.current.value
            }
         })
      } catch (e) {
         setError("Failed to create an account")
         console.log(e)
      }
      setLoading(false)
   }

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header className="align-items-start">
            <div>
               <h2 className="mb-0">Sign Up</h2>
               <small className="text-muted">It's quick and easy.</small>
            </div>
            <h2 style={{fontWeight: '200', cursor: 'pointer'}} className="mb-0" onClick={handleClose}>
               &times;
            </h2>
         </Modal.Header>
         <Modal.Body>
            {error ? (<Alert variant='danger'>{error}</Alert>) : null}
            <Form onSubmit={handleSubmit}>
               <Row className="mb-3">
                  <Col>
                     <Form.Group>
                        <input ref={firstNameRef} type="text" placeholder="First Name" className="form-control" />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group>
                        <input ref={lastNameRef} type="text" placeholder="Last Name" className="form-control" />
                     </Form.Group>
                  </Col>
               </Row>
               <Form.Group className="mb-3">
                  <input ref={emailRef} type="text" className="form-control" placeholder="Email" />
               </Form.Group>
               <Form.Group className="mb-3">
                  <input ref={passwordRef} type="password" className="form-control" placeholder="Password" />
               </Form.Group>
               <Form.Group className="mb-3">
                  <input ref={confirmPasswordRef} type="password" className="form-control" placeholder="Confirm Password" />
               </Form.Group>
               <small className="text-muted mb-2 d-inline-block" style={{fontSize: "12px"}}>
                  By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
               </small>
               <button disabled={loading} className="btn btn-primary w-100">Sign Up</button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default SignUpModal;
