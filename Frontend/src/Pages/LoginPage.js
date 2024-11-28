import { useNavigate } from 'react-router-dom';
import LoginForm from "../Component/Login/LoginForm";
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";

function LoginPage() {
    const navigate = useNavigate();

    const handleLoginSuccess = (token) => {
       
        localStorage.setItem('authToken', token);
        
        navigate('/home');
    };

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <WebsiteTemplate />
        </div>
    );
}

export default LoginPage;
