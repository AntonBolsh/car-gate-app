import './App.css'
import OwnerApp from './components/ownerApp'
import useAuth from "./hooks/useAuth";
import Public from './components/public'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [isLogin, token] = useAuth();


  return (isLogin ? <OwnerApp token={token}/> : <Public/>
  )
}

export default App

