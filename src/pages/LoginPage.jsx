import React, {useState} from 'react'
import InputField from '../components/InputField'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { staffLogin } from '../api/auth';
import { BsShieldLockFill } from "react-icons/bs";
import { BsPersonFillLock } from "react-icons/bs";



const LoginPage = () => {
  
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate()

    const handlelogin = async(e) => {
        e.preventDefault();

        const payload = {username, password};

        if (!username.trim() || !password.trim()) {
          toast.error("❌ Empty credentials are not allowed.")
          return
        }

        try{
          const res = await staffLogin(payload);   
          const token = res.data.access_token;     

          localStorage.setItem('token', token);
          toast.success("✅Login Successful")
          setTimeout(() => navigate("/"), 2500);
        } catch (err) {
          if (!err.response) {
              toast.error('❌ Cannot reach the server. Is it running?');
              return;
          }

          const {status, data} = err.response;
          let message = 'Login failed'

          if (status === 400 || status === 422) {
            if(Array.isArray(data.detail)){
              message = data.detail[0]?.msg || message;
            } else if(typeof data.detail === 'string') {
              message = data.detail;
            }
          }

          toast.error(`❌ ${message}`);}
        }
    
  return (
    <div className='w-full min-h-screen bg-[linear-gradient(180deg,_rgba(246,239,190,1)_0%,_rgba(249,195,180,1)_50%,_rgba(228,34,74,1)_100%)] flex items-center'>
        <div className='w-[70%] h-[70vh] bg-white/30 mx-auto backdrop-blur-[7px] rounded-[20px] flex flex-col justify-center  transition-all duration-300 hover:scale-[1.01]' >
            <h1 className='m-3.5 text-4xl text-center font-medium font-serif'>Login</h1>
            <form className='space-y-4 flex flex-col justify-center items-center w-full max-w-md mx-auto' onSubmit={handlelogin}>
                {/* User Name Field */}
                <InputField id="username" placeholder='Username' minLength='4' onChange={(e) => setUserName(e.target.value)}  value={username}>
                    <BsPersonFillLock />
                </InputField>

                {/* Password Field */}
                <InputField id="password" placeholder='Password' type='password' minLength='5' onChange={(e) => setPassword(e.target.value)}  value={password}>
                <BsShieldLockFill />
                </InputField>


                {/* Submit Button */}
                <button type="submit" className="font-semibold py-2 px-4 rounded-full bg-white hover:bg-orange-500/80 w-full mt-2">
                  Login
                </button> 
            </form>
            <p className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-orange-600 hover:underline">
                  Register
                </Link>
              </p>
        </div>
        
    </div>
  )
}

export default LoginPage