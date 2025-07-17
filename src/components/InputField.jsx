import React, {useState} from 'react'
// import { toast } from 'react-toastify'


const InputField = ({id, placeholder, type = "text", minLength, min, value, onChange ,children}) => {

  const [show, setShow] = useState(false)
  const togglePass = () => {
      setShow(true);
      setTimeout(()=> setShow(false), 2000)
  }
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type
  
  


  return (
    <div className='flex items-center gap-3 bg-gray-200 rounded px-3 py-2 w-full'>
        <span className='text-gray-500 cursor-pointer' onClick={togglePass}>
            {children}
        </span>
        <input 
        id ={id}
        type={inputType}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        minLength={minLength}
        min={min}
        className='w-full bg-transparent outline-none border-none hover:scale-[1.01]' />
    </div>
  )
}

export default InputField