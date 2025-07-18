import React, {useEffect, useState} from 'react'
import api from '../api/axiosInstance'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { createRole } from '../api/auth'
import { toast } from 'react-toastify'
import {MdClose} from 'react-icons/md'
import InputField from './InputField'

const Role = () => {

  const [role, setRole] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModal, setAddModal] = useState(false)
  const [rname, setRname] = useState('')
  const [rdesc, setRdesc] = useState('')

const fetchRoles = async() =>{
  try{
    const response = await api.get('/roles/')
    setRole(response.data);
  } catch(err){
    console.error('Failed to catch error:', err)
  }finally{
    setLoading(false)
  }};

  useEffect(() =>{
    fetchRoles()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {name: rname, description: rdesc};

    try {
      await createRole(payload);
      toast.success("✅ Role created!");
      setRname("");
      setRdesc("");
      fetchRoles();
    } catch (error) {
      if(!error.response){
        toast.error("❌ Cannot reach the server. Is it running?");
        return;
      }
      const { status, data} = error.response;
      let message = "Creation failed.";
      if ((status === 400 || status === 422) && data?.detail) {
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
    <div className='p-6 mx-auto'>
      <h2 className='text-2xl mb-4'>Role</h2>

      <div className="w-full flex m-7">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setAddModal(true)}>Add New Role</button>

        {addModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400/40 z-50">
            <div className="bg-white p-6 rounded-md w-[30%]  relative">
              <div onClick={() => setAddModal(false)} className='flex justify-between text-2xl mb-2 cursor-pointer'>
                <h3 className="text-2xl mb-4 font-medium">Add new Role</h3>
                <MdClose className='transition-300 ease-in-out hover:scale-110 text-gray-700 hover:text-red-600' />
              </div> 
              <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                <InputField placeholder="Role name" minLength="2" onChange={(e) => setRname(e.target.value)} value={rname} required />
                <InputField placeholder="Role Description" minLength="2" onChange={(e) => setRdesc(e.target.value)} value={rdesc} required />
                <button
                    onClick={handleCreate}
                    className="font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max self-end"
                  >
                    Register
                  </button>
              </div>
            </div>
          </div>)}
        {/* <h3 className="text-2xl mb-4 font-medium">Add new Role</h3>

        <form onSubmit={handleCreate} className="flex gap-6">
          <div className="flex flex-col w-7/10">
            <label className="font-extralight">Role Name:</label>
            <input
              className="border outline-none p-1"
              minLength={2}
              required
              onChange={(e) => setRname(e.target.value)}
              value={rname}
            />
          </div>

          <div className="flex flex-col w-8/10">
            <label className="font-light">Role Description:</label>
            <input
              className="border outline-none p-1"
              minLength={2}
              required
              onChange={(e) => setRdesc(e.target.value)}
              value={rdesc}
            />
          </div>

          <button
            type="submit"
            className="font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max self-end"
          >
            Register
          </button>
        </form> */}
      </div>

      <hr className='my-8 border-t border-gray-300'/>

      <h3 className='text-2xl mb-4 font-medium'>All Roles</h3>
      <table className='table-auto border-collapse border border-gray-300'>
        <thead className='bg-gray-200'>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2 ">isAvailable?</th>
            <th className="border px-4 py-2">Staff count?</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (<tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner loading={true} />
              </td>
            </tr>
            ) : (
            <>
              {role.map((index) => (
              <tr key={index.id}>
                <td className="border px-4 py-2">{index.id}</td>
                <td className="border px-4 py-2">{index.name}</td>
                <td className="border px-4 py-2">{index.description}</td>
                <td className="border px-4 py-2">{index.status ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">{index.staff_count}</td>
                <td className="border px-4 py-2">
                  <>
                    <Link className='bg-blue-700 text-white p-1.5 rounded-[5px]'>
                    Edit
                    </Link> {""}
                    <Link className='bg-red-700 text-white p-1.5 rounded-[5px]'>
                    Delete
                    </Link>   
                    </>
                    </td>
              </tr>))}
            </>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Role