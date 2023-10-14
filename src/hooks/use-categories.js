import { useState, useEffect } from "react";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3001/category/${categoryId}`);
      setCategories((prevCats) =>
        prevCats.filter((item) => item.id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const addCategory = async (newCategoryName) => {
    try {
      await axios.post("http://localhost:3001/category", {
        name: newCategoryName,
      });
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return {
    categories,
    fetchCategories,
    deleteCategory,
    addCategory,
  };
}
