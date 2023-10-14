import { useState, useEffect } from "react";
import InputField from "../../../components/InputField";
import { toast } from "react-toastify";
import SubmitBtn from "../../../components/SubmitBtn";
import { useCategories } from "../../../hooks/use-categories";

export default function CategoryList() {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [input, setInput] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newCategoryName = input;
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
