import logo from './logo.svg';
import './App.css';
import Registerpg from './components/Registerpg';
import { Route, Routes } from 'react-router-dom';
import Loginpg from './components/Loginpg';
import Homepg from './components/Homepg';
import Quespg from './components/Quespg';

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Loginpg/>}/>
      <Route path={"/register"} element={<Registerpg/>}/>
      <Route path={"/home"} element={<Homepg/>}/>
    </Routes>
  );
}

export default App;
