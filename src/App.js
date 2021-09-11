import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './bootstrap-overrides.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Authentication/Login'
import Dashboard from './components/Dashboard'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/Authentication/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
