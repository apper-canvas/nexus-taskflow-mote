import categoriesData from "../mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categoryService = {
  getAll: async () => {
    await delay(200);
    return [...categories];
  },

  getById: async (id) => {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  getByName: async (name) => {
    await delay(200);
    const category = categories.find(c => c.name === name);
    return category ? { ...category } : null;
  }
};

export default categoryService;