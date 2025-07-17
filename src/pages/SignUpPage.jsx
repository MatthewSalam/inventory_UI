import React, {useEffect, useState} from 'react'
import InputField from '../components/InputField'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import api from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { registerStaff, staffLogin } from '../api/auth';
import { FaRotateLeft } from 'react-icons/fa6';

const SignUpPage = () => { 
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleID, setRoleID] = useState('')

  const navigate = useNavigate()
  const [role, setRole] = useState([])

  const fetchRoles = async () =>{
    try {
      const response = await api.get("/roles/")
      setRole(response.data)
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("❌ Could not load categories");
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleRegister = async(e) => {
    e.preventDefault(); 


      const payload = { 
        firstname: fname, 
        lastname: lname,
        username,
        password,
        address,
        email,
        phone,
        role_id: roleID || 1
      };

        try {
          await registerStaff(payload);

          const res = await staffLogin({ username, password });
          localStorage.setItem('token', res.data.access_token);

          toast.success('✅ Account created and logged in!');
          setTimeout(() => navigate('/'), 1500);
        } catch (err) {
          if (!err.response) {
            toast.error('❌ Cannot reach the server. Is it running?');
            return;
            }
            // FastAPI validation errors are in response.data.detail (array or string)
            const { status, data } = err.response;
            let message = 'Registration failed.';

            if (status === 400 || status === 422) {
                if (Array.isArray(data.detail)) {
                    // show first validation message
                    message = data.detail[0]?.msg || message;
                 } else if (typeof data.detail === 'string') {
                     message = data.detail;
                   }}

                  toast.error(`❌ ${message}`);}
    };  

    return (
    <div className="w-full h-screen bg-[linear-gradient(90deg,_rgba(0,188,212,1)_0%,_rgba(2,197,222,1)_27%,_rgba(238,130,238,1)_100%)] flex items-center justify-center">
        <div className="w-[70%] h-[90vh] bg-white/30 backdrop-blur-[7px] rounded-[20px] flex flex-col justify-center transition-all duration-300 hover:scale-[1.01] sm:p-8 md:p-8">
            <h1 className='m-3.5 text-4xl text-center font-medium font-serif'>Register new staff</h1>
            <form className="space-y-4 flex flex-col justify-center items-center w-full max-w-md mx-auto" onSubmit={handleRegister}>
        {/* First Name Field */}
          <InputField id="firstname" placeholder='First name' minLength='2' onChange={(e) => setFname(e.target.value)}  value={fname}/>

        {/* Last Name Field */}
          <InputField id="lastname" placeholder='Last name' minLength='2' onChange={(e) => setLname(e.target.value)}  value={lname}/>

        {/* User Name Field */}
          <InputField id="username" placeholder='Username' minLength='4' onChange={(e) => setUserName(e.target.value)}  value={username}/>

        {/* Password Field */}
          <InputField id="password" placeholder='Password' type='password' minLength='5' onChange={(e) => setPassword(e.target.value)}  value={password}/>

        {/* Address Field */}
          <InputField id="address" placeholder='Address' minLength='10' onChange={(e) => setAddress(e.target.value)}  value={address}/>

        {/* Email Field */}
          <InputField id="email" placeholder='E-mail Address' minLength='10' type='email' onChange={(e) => setEmail(e.target.value)}  value={email}/>

        {/* Phone Field */}
          <InputField id="phone" placeholder='Phone' minLength='5' onChange={(e) => setPhone(e.target.value)}  value={phone}/>

        {/* Role Field */}
        <div className="flex items-center gap-3 bg-gray-200 rounded px-3 py-2 w-full">

          <select
          className="w-full bg-transparent outline-none border-none"
          onChange={(e) => setRoleID(Number(e.target.value))}
          value={roleID}
          required
          // defaultValue=""
          >
              <option value="" disabled>
                {role.length ? "Select a role" : "Loading"}
              </option>
              {role.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

        {/* Submit Button */}
        <button type="submit" className="font-semibold py-2 px-4 rounded-full bg-white hover:bg-cyan-500/80 w-full mt-2">
          Register
        </button> 
      </form>
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
        </div>
    </div>
  )
}

export default SignUpPage