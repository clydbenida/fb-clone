import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import httpClient from '../../lib/httpClient'
import Egg from '../../assets/egg.jpg'
import { PostTemplate } from '../Posts/Posts'

const Profile = () => {
   const [ profile, setProfile ] = useState({})
   const [ posts, setPosts ] = useState([])
   const [ loading, setLoading ] = useState(Object.keys(profile).length ? false : true)
   const { uid } = useParams()

   const getProfile = async () => {
      const { data } = await httpClient.get(`/user/${uid}`)
      getPosts()
      setLoading(false)
      return setProfile(data)
   }

   const getPosts = async () => {
      const { data } = await httpClient.get(`/user/${uid}/posts`)
      return setPosts(data)
   }

   useEffect(() => {
      getProfile()
   }, [])

   const PostLists = posts?.map((el, idx) => (<PostTemplate key={idx} post={el.post} createdAt={el.createdAt} author={el.author} />))

   return (
      <>
         {(loading ? (<h4>loading</h4>) : (
            <>
               <div className='text-center'>
                  <img className='img-fluid' src={Egg} width="180" />
                  <h4>{`${profile?.name?.firstName} ${profile?.name?.lastName}`}</h4>
                  <p>Sample Bio should be markdown</p>
               </div>
               <Row>
                  <Col md={3}>
                     <h1>FriendList</h1> 
                  </Col>
                  <Col md={9}>{PostLists}</Col>
               </Row>
            </>
         ))}
      </>
   );
}

export default Profile;