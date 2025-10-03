import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";

const FilterDropdown = ({ filters, onFilterChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (type, value) => {
    const currentFilters = filters[type] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((v) => v !== value)
      : [...currentFilters, value];
    onFilterChange(type, newFilters);
  };

  const activeFilterCount =
    (filters.status?.length || 0) +
    (filters.priority?.length || 0) +
    (filters.category?.length || 0);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <ApperIcon name="Filter" size={18} className="mr-2" />
        Filters
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xs text-white font-semibold">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card-hover border border-gray-100 p-4 z-50"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Status
                  </h4>
                  <div className="space-y-2">
                    {["pending", "in-progress", "completed"].map((status) => (
                      <Checkbox
                        key={status}
                        checked={filters.status?.includes(status)}
                        onChange={() => toggleFilter("status", status)}
                        label={status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Priority
                  </h4>
                  <div className="space-y-2">
                    {["high", "medium", "low"].map((priority) => (
                      <Checkbox
                        key={priority}
                        checked={filters.priority?.includes(priority)}
                        onChange={() => toggleFilter("priority", priority)}
                        label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Category
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
                    {categories.map((category) => (
                      <Checkbox
                        key={category.Id}
                        checked={filters.category?.includes(category.name)}
                        onChange={() => toggleFilter("category", category.name)}
                        label={category.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;