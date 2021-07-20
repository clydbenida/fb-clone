import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Authentication/Login'
import Newsfeed from './components/Newsfeed'
import { AuthProvider, useAuth } from './context/AuthContext'
import PrivateRoute from './components/Authentication/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Newsfeed} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
