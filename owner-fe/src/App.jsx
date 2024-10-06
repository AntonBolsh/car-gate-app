import './App.css'
import OwnerApp from './components/ownerApp'
import Public from './components/public'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const isLogin/*, token]*/ = true //useAuth();


  return (isLogin ? <OwnerApp/> : <Public/>
  )
}

export default App
