import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center mb-6">
        <ApperIcon name="CheckCircle2" size={64} className="text-white" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-gray-800 mb-2">
        No Tasks Yet!
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Start your productivity journey by creating your first task. Stay organized and accomplish your goals!
      </p>
      {onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Create Your First Task
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;