import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../../components/InputField";
import { toast } from "react-toastify";
import SubmitBtn from "../../../components/SubmitBtn";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState("");

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
  const addCategory = async (newCategory) => {
    try {
      await axios.post("http://localhost:3001/category", newCategory);
      fetchCategories();
    } catch (err) {
      console.log("Error adding category:", err);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newCategoryName = { name: input };
    try {
      addCategory(newCategoryName);
      console.log("Category added successfully");
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setInput("");
    }
  };

  return (
    <div className="space-y-4">
      <h2>หมวดหมู่สินค้าทั้งหมด</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-gray-300 p-4 flex justify-between"
          >
            <li>{category.name}</li>
            <li
              className="text-red-500 cursor-pointer underline"
              onClick={() => deleteCategory(category.id)}
            >
              ลบหมวดหมู่
            </li>
          </div>
        ))}
      </ul>
      <>
        <form className="mt-3 space-y-4" onSubmit={handleSubmitForm}>
          <InputField
            placeholder="ชื่อหมวดหมู่"
            name="catName"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <SubmitBtn>ยืนยัน</SubmitBtn>
        </form>
      </>
    </div>
  );
}
