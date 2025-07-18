import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Spinner from '../components/Spinner'; 
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import {  createUser } from '../api/auth';
import {MdClose} from 'react-icons/md'
import InputField from "./InputField";

const User = () => {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false)
  const [lname, setLname] = useState('')
  const [fname, setFname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')


  const fetchUsers = async () => {
      try {
        const response = await api.get('/users/');
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        toast.error("❌ Could not load users");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      firstname: fname,
      lastname: lname,
      email,
      phone
    };

    try{
      await createUser(payload);
      toast.success("✅ Product created!")

      setLname('');
      setFname('');
      setPhone('');
      setEmail('');

      fetchUsers();
    } catch(error) {
      if (!error.response) {
        toast.error("❌ Cannot reach the server. Is it running?")
        return;
      }
      const {status, data} = error.response
      let message = "Creation failed";
      if((status === 400 || status === 422) && data?.detail) {
        message = Array.isArray(data.detail)
        ? data.detail[0]?.msg ?? message
        : data.detail;
      }
      toast.error(`❌ ${message}`);
    }finally{
      setAddModal(false)
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Users</h2>

      
      <div className='w-full flex m-7'>

        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setAddModal(true)}>Add New User</button>

                {addModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400/50 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-[30%]  relative">
              <div onClick={() => setAddModal(false)} className='flex justify-between text-2xl mb-2 cursor-pointer'>
                <h3 className="text-2xl mb-4 font-medium">Add new User</h3>
                <MdClose className='transition-300 ease-in-out hover:scale-110 text-gray-700 hover:text-red-600' />
              </div> 
              <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                <InputField placeholder="Last name" minLength="2" onChange={(e) => setLname(e.target.value)} value={lname} required/>
                <InputField placeholder="First name" minLength="2" onChange={(e) => setFname(e.target.value)} value={fname} required/>
                <InputField placeholder="Email" type='email' minLength="2" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <InputField placeholder="Phone" minLength="2" onChange={(e) => setPhone(e.target.value)} value={phone} required/>
                <button
                    onClick={handleCreate}
                    className="font-semibold align-center py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max self-end"
                  >
                    Register
                  </button>
              </div>
            </div>
          </div>)}

        {/* <h3 className='text-2xl mb-4 font-medium'>Create new User</h3>
        <form className="grid grid-cols-2 gap-2 w-full sm:grid-cols-2" onSubmit={handleCreate}>
            <div className="flex flex-col">
              <label className="font-extralight text-sm">Last Name:</label>
              <input
              className="border rounded px-3 py-2 outline-none focus:ring w-full"
              minLength={2}
              required
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-light">First name:</label>
              <input
                className="border rounded px-3 py-2 outline-none focus:ring w-full"
                minLength={2}
                required
                onChange={(e) => setFname(e.target.value)}
                value={fname}
              />
            </div>

            <div className="flex flex-col">
                  <label className="text-sm mb-1">Email:</label>
                  <input
                    type="email"
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

            <div className="flex flex-col">
                  <label className="text-sm mb-1">Phone:</label>
                  <input
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

            <button
              type="submit"
              className="col-span-2 mt-2 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Create
            </button>
        </form> */}
      </div> 

      <hr className="my-8 border-t border-gray-300" />

      <h3 className='text-2xl mb-4 font-medium'>All Users</h3>

      <div className='overflow-x-auto'>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr><th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">First name</th>
              <th className="border px-4 py-2">Last name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Contact info</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <Spinner loading={true} />
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="border px-4 py-2">{u.id}</td>
                  <td className="border px-4 py-2">{u.firstname}</td>
                  <td className="border px-4 py-2">{u.lastname}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.phone}</td>
                  <td className="border px-4 py-2"><>  <Link className='bg-blue-700 text-white p-1.5 rounded-[5px]'>Edit</Link> <Link className='bg-red-700 text-white p-1.5 rounded-[5px]'>Delete</Link>   </></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default User;
