import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Newsfeed from './components/Newsfeed'
import { AuthProvider, useAuth } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Newsfeed} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
