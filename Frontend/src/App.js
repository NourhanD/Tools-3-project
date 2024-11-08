import RegisterPage from '../src/Pages/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from "../src/Pages/PageNotFound"
import UserHomePage from './Pages/UserHomePage'
import CreateOrderPage from './Pages/CreateOrderPage'
import './App.css';
import LoginPage from './Pages/LoginPage';
import OrderDetailsPage from './Pages/OrderDetailsPage';
import CourierHomePage from './Pages/CourierHomePage';
import UpdateOrderStatus from './Pages/UpdateOrderStatusPage';
import ListOrdersPage from './Pages/ListOrdersPage';



function App() 
{
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/home" element={<UserHomePage />} />
    <Route path="/createOrderPage" element={<CreateOrderPage/>} />
    <Route path="/orderDetails" element={<OrderDetailsPage/>} />
    <Route path="/courierHome" element={<CourierHomePage/>} />
    <Route path="/UpdateOrderStatus" element={<UpdateOrderStatus/>} />
    <Route path="/myorders" element={<ListOrdersPage/>} />


    
    
    <Route path="*" element ={<PageNotFound/>} />
    </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
