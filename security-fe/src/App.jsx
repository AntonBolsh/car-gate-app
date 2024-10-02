import './App.css';
import useAuth from "./hooks/useAuth";
import SearchForm from './components/searchForm'
import Public from './components/public'


function App() {
  const isLogin = useAuth();


  return isLogin ? <SearchForm /> : <Public/>
}

export default App;
