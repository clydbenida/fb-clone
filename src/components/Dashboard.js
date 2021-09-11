import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import HeaderNav from './HeaderNav'
import Newsfeed from './Newsfeed'
import Profile from './Profile/Profile'
import Watch from './Watch/Watch'
import Market from './Market/Market'
import Groups from './Groups/Groups'

const Dashboard = () => {
   
   return (
      <>
      <HeaderNav />
      <main className="container-fluid pt-5" >
         <Row className="mt-4">
            <Col />
            <Col md={5}>
               <Switch>
                  <Route exact path='/' component={Newsfeed} />
                  <Route exact path='/watch' component={Watch} />
                  <Route exact path='/market' component={Market} />
                  <Route exact path='/groups' component={Groups} />
                  <Route path='/user/:uid' component={Profile} />
               </Switch>
            </Col>
            <Col />
         </Row>
      </main>
      </>
   );
}

export default Dashboard;
