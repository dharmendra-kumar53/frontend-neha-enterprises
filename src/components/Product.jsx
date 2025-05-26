import React from 'react';
import { specialityData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (speciality) => {
    navigate(`/furnitures/${speciality}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
      <h1 className='text-3xl font-medium'>Find by Furniture</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted furniture, schedule your booking hassle-free.
      </p>

      <div className='flex sm:justify-center gap-10 pt-5 w-full overflow-scroll'>
        {specialityData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(item.speciality)}
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
          >
            <img className='w-20 sm:w-28 mb-3' src={item.image} alt={item.name} />
            <p>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
