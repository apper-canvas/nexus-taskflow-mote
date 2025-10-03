import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary via-accent to-secondary rounded-full shadow-card-hover flex items-center justify-center z-40 sm:hidden"
    >
      <ApperIcon name="Plus" size={28} className="text-white" />
    </motion.button>
  );
};

export default FloatingActionButton;