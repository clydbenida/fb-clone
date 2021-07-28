import React, { useRef, useState } from 'react';
import { Modal, Form, Alert } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'

const ForgotPasswordModal = ({ show, handleClose }) => {
   const [ error, setError ] = useState('')
   const [ message, setMessage ] = useState('')
   const [ loading, setLoading ] = useState(false)
   const { resetPassword } = useAuth()
   const emailRef = useRef()

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         await resetPassword(emailRef.current.value)
         setMessage('Reset password link sent! Check your inbox for further instructions.')
      } catch (err) {
         setError('Something went wrong')
         console.log(err)
      }
   }

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>
            <h2>Reset Your Password</h2>
         </Modal.Header>
         <Modal.Body>
            {error && (<Alert variant="danger">{error}</Alert>)}
            {message && (<Alert variant="success">{message}</Alert>)}
            <Form onSubmit={handleSubmit}>
               <Form.Control ref={emailRef} type="email" placeholder="Email" />
               <button disabled={loading} className="btn btn-primary w-100 my-3">Send Link</button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default ForgotPasswordModal;
