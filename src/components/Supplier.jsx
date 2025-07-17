import React, {useEffect, useState} from 'react'
import api from '../api/axiosInstance'
import { Link } from 'react-router-dom'
import Spinner from './Spinner';
import {MdClose} from 'react-icons/md'
import { toast } from 'react-toastify';
import { createSupplier } from '../api/auth';
import InputField from './InputField'


const Supplier = () => {

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false)

  const [sname, setSname] = useState('')
  const [saddress, setSaddress] = useState('')
  const [sphone, setSphone] = useState('')
  const [semail, setSemail] = useState('')

  const fetchSuppliers = async () =>{
    try{
      const response = await api.get('/suppliers/');
      setSuppliers(response.data);
    } catch(err){
        console.error('Failed to fetch staff:', err);
    }finally{setLoading(false)}
  };

  useEffect(() => {
      fetchSuppliers()
    }, [])

  const handleCreate = async(e) => {
    e.preventDefault();

    const payload = {name: sname, address: saddress, phone: saddress, email: semail};

    try{
      await createSupplier(payload);
      toast.success("✅ Category created!");
      setSname('');
      setSaddress('');
      setSphone('');
      setSemail('')

      fetchSuppliers()
    } catch(error) {
      if(!error.response) {
        toast.error('"❌ Cannot reach the server. Is it running?"');
        return;
      }

      const { status, data } = error.response
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
  }


  return (
     <div className="p-6">
      <h2 className="text-2xl mb-4">Suppliers</h2>

      <div className='w-full flex m-7'>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setAddModal(true)}>Add New Supplier</button>

        {addModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-[90%]  relative">
                      <div onClick={() => setAddModal(false)} className='flex justify-between text-2xl mb-2 cursor-pointer'>
                        <h3 className="text-2xl mb-4 font-medium">Add new Supplier</h3>
                        <MdClose className='transition-300 ease-in-out hover:scale-110 text-gray-700 hover:text-red-600' />
                      </div> 
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <InputField placeholder="Supplier name" minLength="2" onChange={(e) => setSname(e.target.value)} value={sname} required />
                        <InputField placeholder="Supplier Address" minLength="2" onChange={(e) => setSaddress(e.target.value)} value={saddress} required />
                        <InputField placeholder="Supplier Contact info" minLength="2" onChange={(e) => setSphone(e.target.value)} value={sphone} required />
                        <InputField placeholder="Supplier Email" minLength="2" type='email' onChange={(e) => setSemail(e.target.value)} value={semail} required />
                        <button
                            onClick={handleCreate}
                            className="font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max self-end"
                          >
                            Register
                          </button>
                      </div>
                    </div>
                  </div>)}
        {/* <h3 className='text-2xl mb-4 font font-medium'>Add new Supplier</h3>

        <form onSubmit={handleCreate} className='grid grid-cols-2 gap-2 w-full'>
            <div className="flex flex-col">
                  <label className="text-sm mb-1">Supplier Name:</label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={sname}
                    onChange={(e) => setSname(e.target.value)}
                    required
                  />
                </div>

            <div className="flex flex-col">
                  <label className="text-sm mb-1">Supplier Address:</label>
                  <input
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={saddress}
                    onChange={(e) => setSaddress(e.target.value)}
                    required
                  />
                </div>

              <div className="flex flex-col">
                    <label className="text-sm mb-1">Supplier Contact info:</label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 outline-none focus:ring w-full"
                      value={sphone}
                      placeholder='Optional'
                      onChange={(e) => setSphone(e.target.value)}
                      // required
                    />
                  </div>

              <div className="flex flex-col">
                    <label className="text-sm mb-1">Supplier Email</label>
                    <input
                    type='email'
                      className="border rounded px-3 py-2 outline-none focus:ring w-full"
                      value={semail}
                      onChange={(e) => setSemail(e.target.value)}
                      required
                    />
                  </div>
            <button
              type="submit"
              className="col-span-2 mt-2 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Register
            </button>
        </form> */}
      </div>

      <hr className="my-8 border-t border-gray-300" />

      <h3 className="text-2xl mb-4 font-medium">All Categories</h3>
      <table className="min-w-full border">
        <thead className='bg-gray-200'>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
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
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td className="border px-4 py-2">{s.id}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.address}</td>
              <td className="border px-4 py-2">{s.email}</td>
              <td className="border px-4 py-2">{s.phone}</td>
              <td className="border px-4 py-2"><>  <Link className='bg-blue-700 text-white p-1.5 rounded-[5px]'>Edit</Link> <Link className='bg-red-700 text-white p-1.5 rounded-[5px]'>Delete</Link>   </></td>
            </tr>
          ))}
          </>)}
        </tbody>
      </table>
    </div>
  )
}

export default Supplier

 
