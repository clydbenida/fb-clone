import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './components/Login'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Login />
      </div>
    </AuthProvider>
  );
}

export default App;
