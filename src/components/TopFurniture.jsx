import React from 'react';
import { useNavigate } from 'react-router-dom';
import { furnitureItems } from '../assets/assets';
import FurnitureCard from './FurnitureCard';

const TopFurniture = () => {
  const navigate = useNavigate();
  const top12Items = furnitureItems.slice(0, 12);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
      <h1 className='text-4xl font-medium text-center text-gray-900'>
        Explore Our Premium Furniture Collection
      </h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-600'>
        Simply browse through our extensive list of trusted Furniture.
      </p>
      
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0 bg-gray-100'>
      {top12Items.map((item) => (
  <div className='group' key={item.id}>
    <FurnitureCard item={item} />
  </div>
))}

      </div>
      
      <button 
        onClick={() => { navigate('/furnitures'); window.scrollTo(0, 0); }} 
        className='bg-blue-700 text-white px-12 py-3 rounded-full mt-10 transition-all transform hover:bg-blue-800 hover:scale-105'>
        More
      </button>
    </div>
  );
};

export default TopFurniture;
