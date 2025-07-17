import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createCategory } from "../api/auth";
import {MdClose} from 'react-icons/md'
import InputField from "./InputField";


const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false)
  const [cname, setCname] = useState('');
  const [cdesc, setCdesc] = useState('');

  const fetchCategory = async () => {
    try {
      const response = await api.get("/categories/");
      setCategory(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("❌ Could not load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

const handleCreate = async (e) => {
    e.preventDefault();

    const payload = { name: cname, description: cdesc };

    try {
      await createCategory(payload);
      toast.success("✅ Category created!");
      setCname("");
      setCdesc("");
      
      fetchCategory();
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
    <div className="p-6 mx-auto">
      <h2 className="text-2xl mb-4 font-bold">Category</h2>

      <div className="w-full flex m-7">

        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setAddModal(true)}>Add New Category</button>

        {addModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-[90%]  relative">
              <div onClick={() => setAddModal(false)} className='flex justify-between text-2xl mb-2 cursor-pointer'>
                <h3 className="text-2xl mb-4 font-medium">Add new Category</h3>
                <MdClose className='transition-300 ease-in-out hover:scale-110 text-gray-700 hover:text-red-600' />
              </div> 
              <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <InputField placeholder="Category name" minLength="2" onChange={(e) => setCname(e.target.value)} value={cname} required/>
                <InputField placeholder="Category Description" minLength="2" onChange={(e) => setCdesc(e.target.value)} value={cdesc} required/>
                <button
                    onClick={handleCreate}
                    className="font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-cyan-500/80 h-max self-end"
                  >
                    Register
                  </button>
              </div>
            </div>
          </div>)}
        {/*

        <form onSubmit={handleCreate} className="flex gap-6">
          <div className="flex flex-col w-7/10">
            <label className="font-extralight">Category Name:</label>
            <input
              className="border outline-none p-1"
              minLength={2}
              required
              onChange={(e) => setCname(e.target.value)}
              value={cname}
            />
          </div>

          <div className="flex flex-col w-8/10">
            <label className="font-light">Category Description:</label>
            <input
              className="border outline-none p-1"
              minLength={2}
              required
              onChange={(e) => setCdesc(e.target.value)}
              value={cdesc}
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

      <hr className="my-8 border-t border-gray-300" />

      <h3 className="text-2xl mb-4 font-medium">All Categories</h3>
      <table className="table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">isActive?</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner loading />
              </td>
            </tr>
          ) : (
            category.map((cate) => (
              <tr key={cate.id}>
                <td className="border px-4 py-2">{cate.id}</td>
                <td className="border px-4 py-2">{cate.name}</td>
                <td className="border px-4 py-2">{cate.description}</td>
                <td className="border px-4 py-2">{cate.is_active ? "Yes" : "No"}</td>
                <td className="border px-4 py-2">{cate.product_count}</td>
                <td className="border px-4 py-2">
                  <>
                    <Link className="bg-blue-700 text-white p-1.5 rounded-[5px]">
                      Edit
                    </Link>{" "}
                    <Link className="bg-red-700 text-white p-1.5 rounded-[5px]">
                      Delete
                    </Link>
                  </>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
