import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const override ={
    display: 'block',
    margin: '100px auto'
}

const Spinner = ({ loading}) => {
  return (
    <HashLoader 
    color='#ffffff'
    loading={loading}
    cssOverride={override}
    size={40}
    />
  )
}

export default Spinner