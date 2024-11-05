import logo from './logo.svg';
import RegisterPage from '../src/Pages/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from "../src/Pages/PageNotFound"
import UserHomePage from './Pages/UserHomePage'
import CreateOrderPage from './Pages/CreateOrderPage'
import './App.css';
import LoginPage from './Pages/LoginPage';

function App() 
{
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/home" element={<UserHomePage/>} />
    <Route path="/createOrderPage" element={<CreateOrderPage/>} />
    
    <Route path="*" element ={<PageNotFound/>} />
    </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
