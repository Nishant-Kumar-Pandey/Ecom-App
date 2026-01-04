import React from "react";
import ProductCard from "./ProductCard";

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating flex">
      {[...Array(5)].map((_, index) => {
        // Star index starts at 0, so we use index + 1
        const isFilled = index + 1 <= Math.round(rating);
        return (
          <span
            key={index}
            className={`text-xl ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            {isFilled ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

// Usage
{/* <StarRating rating={product.rating} /> */ }
export default StarRating;