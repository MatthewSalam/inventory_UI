// src/components/StaffRegisterForm.jsx
import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import { toast } from 'react-toastify';
import { registerStaff } from '../api/auth';
import api from '../api/axiosInstance';

const StaffRegisterForm = ({ onClose }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleID, setRoleID] = useState('');

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

  const handleRegister = async (e) => {
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
      toast.success('✅ Staff registered!');
      onClose(); // close modal
    } catch (err) {
      const { status, data } = err.response || {};
      let message = 'Registration failed.';
      if ((status === 400 || status === 422) && data?.detail) {
        message = Array.isArray(data.detail)
          ? data.detail[0]?.msg ?? message
          : data.detail;
      }
      toast.error(`❌ ${message}`);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleRegister}>
      <h2 className="text-xl font-semibold text-center">Register Staff</h2>
      <InputField id="firstname" placeholder="First name" minLength="2" onChange={(e) => setFname(e.target.value)} value={fname} />
      <InputField id="lastname" placeholder="Last name" minLength="2" onChange={(e) => setLname(e.target.value)} value={lname} />
      <InputField id="username" placeholder="Username" minLength="4" onChange={(e) => setUserName(e.target.value)} value={username} />
      <InputField id="password" placeholder="Password" type="password" minLength="5" onChange={(e) => setPassword(e.target.value)} value={password} />
      <InputField id="address" placeholder="Address" minLength="10" onChange={(e) => setAddress(e.target.value)} value={address} />
      <InputField id="email" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <InputField id="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
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
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
    </form>
  );
};

export default StaffRegisterForm;
