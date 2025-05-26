import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
   
      <div className='md:mx-10'>
      {/* <hr className='border border-b-slate-800' /> */}
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
             {/* .......Left Side..........*/}
             <div >
                <img className='mb-5 w-70' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
             </div>
             {/* .......Center Side..........*/}
             <div className=''>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
             </div>
             {/* .......Right Side..........*/}
             <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+918210610423</li>
                    <li>dharmendracgs1234@gmail.com</li>
                </ul>
             </div>
        </div>

        {/* .......copyright Text..........*/}
        <div className='py-5 text-sm text-center '>
            <p>Copyright © 2025 Dharmendra - All Right Reserved.</p>
        </div>
    </div>
  )
}
   

export default Footer
