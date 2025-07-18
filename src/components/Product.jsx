import React, {useEffect, useState} from 'react'
import api from '../api/axiosInstance'
import Spinner from './Spinner'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { createProduct } from '../api/auth'
import {MdClose} from 'react-icons/md'
import InputField from './InputField'


const Product = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModal, setAddModal] = useState(false)

  const [pname, setPname] = useState('')
  const [pdesc, setPdesc] = useState('')
  const [punit, setPunit] = useState('')
  const [pdetails, setPdetails] = useState('')
  const [price, setPrice] = useState('')
  const [catID, setCatID] = useState('')

  const [categories, setCategories] = useState([]);


  const fetchProducts = async () => {
    try{
      const response = await api.get('/products/')
      setProduct(response.data);
    }catch(err){
      console.error('Failed to catch error:', err);
  }finally{setLoading(false)}};

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories/");
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      toast.error("❌ Could not load categories");
    }
  };

  useEffect(() => {
      fetchProducts();
      fetchCategories();
    }, [])

  const handleCreate = async (e) => {
      e.preventDefault();
  
      const payload = { 
        name: pname, 
        desc: pdesc,
        unit: punit,
        other_details: pdetails,
        price,
        cat_id: catID
         };
  
      try {
        await createProduct(payload);
        toast.success("✅ Product created!");

        setPname("");
        setPdesc("");
        setPdesc("");
        setPunit();
        setPdesc("");
        setPdetails("");
        setPrice("");
        setCatID("");

        fetchProducts();
      } catch (error) {
        if (!error.response) {
          toast.error("❌ Cannot reach the server. Is it running?");
          return;
        }
        const { status, data } = error.response;
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
    <>
    <div className='p-6 max-w-screen-lg mx-auto'>
      <h2 className="text-2xl mb-4">Products</h2>

      <div className='w-full flex m-7'>

        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setAddModal(true)}>Add New Product</button>

        {addModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400/50 bg-opacity-500 z-50">
            <div className="bg-white p-6 rounded-md w-[30%]  relative">
              <div onClick={() => setAddModal(false)} className='flex justify-between text-2xl mb-2 cursor-pointer'>
                <h3 className="text-2xl mb-4 font-medium">Add new Product</h3>
                <MdClose className='transition-300 ease-in-out hover:scale-110 hover:text-blue-500' />
              </div> 
              <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                <InputField placeholder="Product name" minLength="2" onChange={(e) => setPname(e.target.value)} value={pname} required />
                <InputField placeholder="Product Description" minLength="2" onChange={(e) => setPdesc(e.target.value)} value={pdesc} required />
                <InputField placeholder="Additional Details (Optional)" minLength="2" onChange={(e) => setPdetails(e.target.value)} value={pdetails} />
                <InputField placeholder="Unit" type='number' onChange={(e) => setPunit(e.target.value)} value={punit} />
                <InputField placeholder="Price" minLength="2" onChange={(e) => setPrice(e.target.value)} value={price} />
                <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white mb-3"
                      value={catID}
                      onChange={(e) => setCatID(e.target.value)}
                          >
                        <option value="" disabled>
                          {categories.length ? "Select a category" : "Loading…"}
                          </option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
              </div>
                  <button
                    onClick={handleCreate}
                    className="mx-auto font-semibold bottom-2 py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max"
                  >
                    Register
                  </button>
            </div>
          </div>)}

        {/* <h3 className='text-2xl mb-4 font-medium'>Add new Product</h3>
        <form className="grid grid-cols-2 gap-2 w-full sm:grid-cols-1" onSubmit={handleCreate}>
            <div className="flex flex-col">
              <label className="font-extralight text-sm">Product Name:</label>
              <input
              className="border rounded px-3 py-2 outline-none focus:ring w-full"
              minLength={2}
              required
              onChange={(e) => setPname(e.target.value)}
              value={pname}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-light">Product Description:</label>
              <input
                className="border rounded px-3 py-2 outline-none focus:ring w-full"
                minLength={2}
                required
                onChange={(e) => setPdesc(e.target.value)}
                value={pdesc}
              />
            </div>

            <div className="flex flex-col">
                  <label className="text-sm mb-1">Additional Details</label>
                  <input
                    type="email"
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={pdetails}
                    placeholder='Optional'
                    onChange={(e) => setPdetails(e.target.value)}
                    // required
                  />
                </div>

            <div className="flex flex-col">
                  <label className="text-sm mb-1">Unit</label>
                  <input
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={punit}
                    onChange={(e) => setPunit(e.target.value)}
                    required
                  />
                </div>

              <div className="flex flex-col">
                  <label className="text-sm mb-1">Price</label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

              <div className="flex flex-col">
                    <label className="text-sm mb-1">Category</label>
                    <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={catID}
                      onChange={(e) => setCatID(e.target.value)}
                          >
                        <option value="" disabled>
                          {categories.length ? "Select a category" : "Loading…"}
                          </option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
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

      <h3 className='text-2xl mb-4 font-medium'>All Products</h3>
      <div className='overflow-x-auto'>
        <table className='table-auto border-collapse border border-gray-300'>
        <thead className='bg-gray-200'>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2 ">isAvailable?</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Additional Details</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            {/* <th className="border px-4 py-2">Supplier</th> */}
            <th className="border px-4 py-2 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (<tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner loading={true} />
              </td>
            </tr>
            ) : (<>
              {product.map((prod) => (
              <tr key={prod.id}>
                <td className="border px-4 py-2">{prod.id}</td>
                <td className="border px-4 py-2">{prod.name}</td>
                <td className="border px-4 py-2">{prod.desc?.slice(0, 50)}</td>
                <td className="border px-4 py-2">{prod.status ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">{prod.unit}</td>
                <td className="border px-4 py-2">{prod.other_details?.slice(0, 50)}</td>
                <td className="border px-4 py-2">{prod.price}</td>
                <td className="border px-4 py-2">{prod.category_name}</td>
                {/* <td className="border px-4 py-2">{prod.supplier_name}</td> */}
                <td className="border px-4 py-2"><>  <Link className='bg-blue-700 text-white p-1 rounded-[5px]'>Edit</Link> <Link className='bg-red-700 text-white p-1 rounded-[5px]'>Delete</Link>   </></td>
              </tr>
                ))}
              </>)}
        </tbody>
      </table>
      </div>

    </div>
    </>
  )
}

export default Product
