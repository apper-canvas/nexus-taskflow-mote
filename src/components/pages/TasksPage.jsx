import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import DeleteModal from "@/components/organisms/DeleteModal";
import FloatingActionButton from "@/components/organisms/FloatingActionButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    category: [],
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll(),
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryColors = useMemo(() => {
    const colors = {};
    categories.forEach((cat) => {
      colors[cat.name] = cat.color;
    });
    return colors;
  }, [categories]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(task.status);

      const matchesPriority =
        filters.priority.length === 0 || filters.priority.includes(task.priority);

      const matchesCategory =
        filters.category.length === 0 || filters.category.includes(task.category);

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchTerm, filters]);

  const handleFilterChange = (type, values) => {
    setFilters((prev) => ({ ...prev, [type]: values }));
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (selectedTask) {
        const updatedTask = await taskService.update(selectedTask.Id, taskData);
        setTasks((prev) =>
          prev.map((t) => (t.Id === selectedTask.Id ? updatedTask : t))
        );
        toast.success("Task updated successfully!");
      } else {
        const newTask = await taskService.create(taskData);
        setTasks((prev) => [...prev, newTask]);
        toast.success("Task created successfully!");
      }
      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error("Failed to save task");
    }
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await taskService.delete(taskToDelete.Id);
      setTasks((prev) => prev.filter((t) => t.Id !== taskToDelete.Id));
      toast.success("Task deleted successfully!");
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      let updatedTask;
      if (task.status === "completed") {
        updatedTask = await taskService.uncompleteTask(task.Id);
        toast.info("Task marked as incomplete");
      } else {
        updatedTask = await taskService.completeTask(task.Id);
        toast.success("Task completed! Great job! 🎉");
      }
      setTasks((prev) =>
        prev.map((t) => (t.Id === task.Id ? updatedTask : t))
      );
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateTask={handleCreateTask}
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredTasks.length === 0 ? (
          searchTerm || filters.status.length > 0 || filters.priority.length > 0 || filters.category.length > 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Search" size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-800 mb-2">
                No Tasks Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <Empty onAction={handleCreateTask} />
          )
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            categoryColors={categoryColors}
          />
        )}
      </main>

      <FloatingActionButton onClick={handleCreateTask} />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        task={selectedTask}
        categories={categories}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
};

export default TasksPage;