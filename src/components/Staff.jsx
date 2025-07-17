import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import InputField from './InputField'
import { toast } from 'react-toastify'
import { registerStaff } from '../api/auth'


const Staff = () => {

  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleID, setRoleID] = useState('');

  const [role, setRole] = useState([])


  const fetchStaff = async () => {
    try {
      const response = await api.get('/staff/');
      setStaff(response.data);
    }
    catch (err) {
      console.error('Failed to fetch staff:', err);
    }
    finally{setLoading(false)};
  }

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
    fetchStaff();
    fetchRoles();
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
    <div className='p-6'>
      <h2 className='text-2xl mb-4'>Staff</h2>

    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>Add New Staff</button>

    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md w-[90%]  relative">
          <div>
            <h3 className="text-2xl mb-4 font-medium">Register Staff</h3>
            <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-lg"
          >
            &times;
          </button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 space-y-3'>
            <InputField id="firstname" placeholder="First name" minLength="2" onChange={(e) => setFname(e.target.value)} value={fname} required />
            <InputField id="lastname" placeholder="Last name" minLength="2" onChange={(e) => setLname(e.target.value)} value={lname} required />
            <InputField id="username" placeholder="Username" minLength="4" onChange={(e) => setUserName(e.target.value)} value={username} required />
            <InputField id="password" placeholder="Password" type="password" minLength="5" onChange={(e) => setPassword(e.target.value)} value={password} required />
            <InputField id="address" placeholder="Address" minLength="10" onChange={(e) => setAddress(e.target.value)} value={address} required />
            <InputField id="email" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <InputField id="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
            <select
                className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
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
                  <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
          </div>
      </div>
    </div>)}

      <hr className='my-8 border-t border-gray-300'/>

      <h3 className='text-2xl mb-4 font-medium'>All Staff</h3>
      <table className='table-auto border-collapse border border-gray-300'>
        <thead className='bg-gray-200'>
          <tr>
            <th className="border px-4 py-2">First name</th>
            <th className="border px-4 py-2">Last name</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Contact info</th>
            <th className="border px-4 py-2 w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
        {loading ? 
        (<tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner loading={true} />
              </td>
            </tr>
          ) : (        
        <>          
        {staff.map((staf) => (
              <tr key={staf.id}>
                <td className="border px-4 py-2">{staf.firstname}</td>
                <td className="border px-4 py-2">{staf.lastname}</td>
                <td className="border px-4 py-2">{staf.username}</td>
                <td className="border px-4 py-2">{staf.address}</td>
                <td className="border px-4 py-2">{staf.email}</td>
                <td className="border px-4 py-2">{staf.phone}</td>
                <td className="border px-4 py-2"><>  <Link className='bg-blue-700 text-white p-1.5 rounded-[5px]'>Edit</Link> <Link className='bg-red-700 text-white p-1.5 rounded-[5px]'>Delete</Link>   </></td>
              </tr>
          ))}
        </>)}
        </tbody>
      </table>
    </div>    
  )
}

export default Staff