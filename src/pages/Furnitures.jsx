import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { categories } from "../assets/assets";
import FurnitureCard from "../components/FurnitureCard";

const Furnitures = () => {
  const { speciality } = useParams();
  const { furnitureItems = [] } = useContext(AppContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!speciality || speciality.toLowerCase() === "all") {
      setFilteredItems(furnitureItems);
    } else {
      const filtered = furnitureItems.filter(
        (item) => item.speciality?.toLowerCase() === speciality.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  }, [speciality, furnitureItems]);

  return (
    <div className="p-4 min-h-screen">
      {/* Category Circles */}
      <div className="w-full flex justify-center mt-4">
        <div className="flex overflow-x-auto gap-6 mb-8 pb-3 px-5 no-scrollbar">
          {categories.map((type) => {
            const isActive =
              (speciality &&
                speciality.toLowerCase() === type.toLowerCase()) ||
              (!speciality && type.toLowerCase() === "all");

            return (
              <div
                key={type}
                onClick={() =>
                  type.toLowerCase() === "all"
                    ? navigate("/furnitures")
                    : navigate(`/furnitures/${type}`)
                }
                className={`min-w-[90px] h-[90px] flex items-center justify-center rounded-full
                  text-sm font-semibold cursor-pointer transition-all duration-200 border-4 shadow-md transform
                  ${
                    isActive
                      ? "bg-indigo-500 text-white border-indigo-600 scale-100"
                      : "bg-white hover:bg-gray-100 border-gray-300 text-gray-600 hover:scale-105"
                  }`}
                style={{ flexShrink: 0 }}
              >
                {type}
              </div>
            );
          })}
        </div>
      </div>

      {/* Furniture Cards */}
      <div className="grid grid-cols-1 bg-gray-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FurnitureCard key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg mt-14">
            No items available for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Furnitures;
