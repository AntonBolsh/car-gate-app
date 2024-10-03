import './App.css';
import useAuth from "./hooks/useAuth";
import SearchForm from './components/searchForm'
import Public from './components/public'


function App() {
  const [isLogin, token] = useAuth();


  return isLogin ? <SearchForm token={token} /> : <Public/>
}

export default App;
