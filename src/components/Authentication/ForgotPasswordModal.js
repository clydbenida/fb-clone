import React, { useRef, useState } from 'react';
import { Modal, Form, Alert } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'

const ForgotPasswordModal = ({ show, handleClose }) => {
   const [ error, setError ] = useState('')
   const { resetPassword } = useAuth()
   const emailRef = useRef()

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         await resetPassword(emailRef.current.value)
      } catch (err) {
         setError('Something went wrong')
         console.log(err)
      }
   }

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>
            <h2>Forgot Password</h2>
         </Modal.Header>
         <Modal.Body>
            {error && (<Alert variant="danger">{error}</Alert>)}
            <Form onSubmit={handleSubmit}>
               <Form.Control ref={emailRef} type="email" placeholder="Email" />
               <button className="btn btn-primary w-100 my-3">Send Link</button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default ForgotPasswordModal;
