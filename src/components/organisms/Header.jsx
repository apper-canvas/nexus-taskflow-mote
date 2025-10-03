import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";

const Header = ({
  searchTerm,
  onSearchChange,
  onCreateTask,
  filters,
  onFilterChange,
  categories,
}) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
              <ApperIcon name="CheckCircle2" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <Button
            variant="primary"
            onClick={onCreateTask}
            className="hidden sm:flex"
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            New Task
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search tasks by title or description..."
            />
          </div>
          <FilterDropdown
            filters={filters}
            onFilterChange={onFilterChange}
            categories={categories}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;