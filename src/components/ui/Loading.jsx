import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="bg-white rounded-xl shadow-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-gray-200 mt-2"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-full"></div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse w-20"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse w-24"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse w-28"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;