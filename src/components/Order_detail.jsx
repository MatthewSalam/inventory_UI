import React, {useState, useEffect} from 'react'
import api from '../api/axiosInstance'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOrderDetail } from '../api/auth'
import {MdClose} from 'react-icons/md'
import InputField from "./InputField";

const Order_detail = () => {
  const [od, setOD] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModal, setAddModal] = useState(false)

  const [orderID, setOrderID] = useState('')
  const [productID, setProductID] = useState('')
  const [bill_number, setBillNumber] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')

  const [product, setProduct] = useState([])
  const [payment, setPayment] = useState([])
  const [order, setOrder] = useState([])

  const fetchProducts = async () => {
    try{
      const response = await api.get('/products/')
      setProduct(response.data);
    }catch(err){
      console.error('Failed to catch error:', err);
  }};

  const fetchPayments = async () => {
    try{
      const response = await api.get('/payments/')
      setPayment(response.data);
    }catch(err){
      console.error('Failed to catch error:', err);
  }};

  const fetchOrders = async () => {
    try{
      const response = await api.get('/orders/active')
      setOrder(response.data);
    }catch(err){
      console.error('Failed to catch error:', err);
  }};

  const fetchOD = async() => {
    try {
      const response = await api.get("/orderdetails/active");
      setOD(response.data);
    } catch (error){
      console.error("Failed to fetch order_details:", error);
    } finally{setLoading(false)}
  }

  useEffect(() => {
    fetchOD();
    fetchProducts();
    fetchPayments();
    fetchOrders();
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      orderID,
      productID,
      bill_number,
      price,
      discount
    };

    try{
      await createOrderDetail(payload);
      toast.success("✅ Order Detail created!");

      setOrderID('');
      setProductID('');
      setBillNumber('');
      setPrice('');

      fetchOD();
    } catch(error){
        if(!error.response){
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
  }

  return (
    <div className='p-6 max-w-screen-lg mx-auto'>
      <h2 className='text-2xl mb-4'>Order-Detail</h2>

      <div className='w-full flex m-7'>

        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setAddModal(true)}>Add New Order_detail</button>

        {addModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-[90%]  relative">
              <div onClick={() => setAddModal(false)} className='flex justify-between text-2xl mb-2 cursor-pointer'>
                <h3 className="text-2xl mb-4 font-medium">Add new Order_detail</h3>
                <MdClose className='transition-300 ease-in-out hover:scale-110 hover:text-blue-500' />
              </div> 
              <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={orderID}
                      onChange={(e) => setOrderID(e.target.value)}
                          >
                        <option value="" disabled>
                          {order.length ? "Select a order_id" : "Loading…"}
                          </option>
                          {order.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.id}
                            </option>
                          ))}
                    </select>
                <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={productID}
                      onChange={(e) => setProductID(e.target.value)}
                          >
                        <option value="" disabled>
                          {product.length ? "Select a product" : "Loading…"}
                          </option>
                          {product.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.name}
                            </option>
                          ))}
                      </select>
                  <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={bill_number}
                      onChange={(e) => setBillNumber(e.target.value)}
                          >
                        <option value="" disabled>
                          {payment.length ? "Select a payment_type" : "Loading…"}
                          </option>
                          {payment.map((o) => (
                            <option key={o.bill_number} value={o.bill_number}>
                              {o.payment_type}
                            </option>
                          ))}
                        </select>
                  
                <InputField placeholder="Discount(1% to 90%)" type='number' onChange={(e) => setDiscount(e.target.value)} value={discount} />
                <InputField placeholder="Price" minLength="2" onChange={(e) => setPrice(e.target.value)} value={price} />
                <button
                    onClick={handleCreate}
                    className="font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max self-end"
                  >
                    Register
                  </button>
              </div>
            </div>
          </div>)}
        {/* <h3 className='text-2xl mb-4 font-medium'>Create new Order_detail</h3>
        <form onSubmit={handleCreate} className='grid grid-cols-2 gap-2 w-full'>
          <div className="flex flex-col">
                    <label className="text-sm mb-1">Order ID:</label>
                    <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={orderID}
                      onChange={(e) => setOrderID(e.target.value)}
                          >
                        <option value="" disabled>
                          {order.length ? "Select a order_id" : "Loading…"}
                          </option>
                          {order.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.id}
                            </option>
                          ))}
                        </select>
                    </div>
          <div className="flex flex-col">
                    <label className="text-sm mb-1">Product:</label>
                    <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={productID}
                      onChange={(e) => setProductID(e.target.value)}
                          >
                        <option value="" disabled>
                          {product.length ? "Select a product" : "Loading…"}
                          </option>
                          {product.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.name}
                            </option>
                          ))}
                        </select>
                    </div>

          <div className="flex flex-col">
                    <label className="text-sm mb-1">Payment type:</label>
                    <select
                      className="border rounded px-3 py-2 outline-none focus:ring w-full bg-white"
                      value={bill_number}
                      onChange={(e) => setBillNumber(e.target.value)}
                          >
                        <option value="" disabled>
                          {payment.length ? "Select a payment_type" : "Loading…"}
                          </option>
                          {payment.map((o) => (
                            <option key={o.bill_number} value={o.bill_number}>
                              {o.payment_type}
                            </option>
                          ))}
                        </select>
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
                  <label className="text-sm mb-1">Discount</label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 outline-none focus:ring w-full"
                    value={discount}
                    placeholder='1% to 100%'
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                  />
                </div>
        </form> */}
      </div>

      <hr className="my-8 border-t border-gray-300" />

      <h3 className='text-2xl mb-4 font-medium'>All Products</h3>
      <div className='overflow-x-auto'>
      <table className='table-auto border-collapse border border-gray-300'>
        <thead className='bg-gray-200'>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Payment type</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Discount (%)</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                <Spinner loading={true} />
              </td>
            </tr>
          ) : (
            <>
              {od.map((o) => (
              <tr key={o.id}>
                <td className="border px-4 py-2">{o.order_id}</td>
                <td className="border px-4 py-2">{o.product_id}</td>
                <td className="border px-4 py-2">{o.payment_type || "N/A"}</td>
                <td className="border px-4 py-2">{new Date(o.date).toLocaleString()}</td>
                <td className="border px-4 py-2">₦{o.price}</td>
                <td className="border px-4 py-2">{o.discount}%</td>
                <td className="border px-4 py-2 font-semibold">
                  Total: ₦{o.total?.toFixed(2) ?? "0.00"}
                </td>
                <td className="border px-4 py-2">
                  <>
                    <Link className='bg-blue-700 text-white p-1.5 rounded-[5px] mr-1'>Edit</Link>
                    <Link className='bg-red-700 text-white p-1.5 rounded-[5px]'>Delete</Link>
                  </>
                </td>
              </tr>
            ))}
            </>
          )}
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default Order_detail