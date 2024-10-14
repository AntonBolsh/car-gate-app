import './App.css';
import useAuth from "./hooks/useAuth";
import SearchForm from './components/searchForm'

function App() {
  const [isLogin, token] = useAuth();


  return (isLogin && <SearchForm token={token} /> )
}

export default App;
