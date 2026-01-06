import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const StarRating = ({ rating, size = 18 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.round(rating);
        const isHalf = !isFilled && starValue - 0.5 <= rating;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <Star
              size={size}
              className={`${isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalf
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "text-slate-200 dark:text-slate-800"
                } transition-colors duration-300`}
            />
          </motion.div>
        );
      })}
      {rating > 0 && (
        <span className="ml-2 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
