import React from 'react'
import '../heroBackdrop.css'

const HeroBackdrop = ({children, minHeight ='200rem'}) => {
  return (
    <section className='relative isolate w-full overflow-hidden' style={{minHeight}}>
        <div className='absolute inset-0'>
            <div className='folder-mask w-full h-full' >
            <div className='spotlight'/>
        </div>
        </div>
        <div className='relative z-10 px-6 py-10 text-gray-100'>{children}</div>
    </section>
  )
}

export default HeroBackdrop