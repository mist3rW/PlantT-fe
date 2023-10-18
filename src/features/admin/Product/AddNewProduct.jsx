import { useState } from "react";
import InputField from "../../../components/InputField";
import { useCategories } from "../../../hooks/use-categories";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNewProduct() {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    brand: "",
    stock: "",
    desc: "",
    menu_order: 0,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  const handleChangeInput = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCategoryObj = categories.find(
      (category) => category.name === selectedCategory
    );
    const categoryId = selectedCategoryObj.id;
    try {
      const productPayload = {
        name: productData.name,
        price: +productData.price,
        SKU: productData.sku,
        brand: productData.brand,
        stock: +productData.stock,
        desc: productData.desc,
        menu_order: +productData.menu_order,
        categoryId: categoryId,
      };

      //# NEW
      const formData = new FormData();
      formData.append("image_url", imageFile);
      formData.append("productInfo", JSON.stringify(productPayload));

      const productResponse = await axios.post(
        "http://localhost:3001/product",
        formData
      );

      //#####

      console.log("Product Added Successfully", productResponse.data);
      toast.success("Product Added Successfully!");
      setProductData({
        name: "",
        sku: "",
        price: "",
        brand: "",
        stock: "",
        desc: "",
        menu_order: 0,
      });
    } catch (err) {
      console.log(err);
      console.error("Error Adding Product", err);
    }
  };

  return (
    <>
      <form className="mt-4 bg-[#fafafa] p-4 space-y-4" onSubmit={handleSubmit}>
        <p>ภาพประกอบสินค้า</p>

        <input
          className="mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={handleChangeFile}
        />
        <InputField
          placeholder="ชื่อสินค้า"
          name="name"
          onChange={handleChangeInput}
          value={productData.name}
        />
        <select
          id=""
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          // className="border border-gray-300 text-gray-400  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          className={`border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            selectedCategory === "เลือกหมวดหมู่"
              ? "text-gray-400"
              : "text-black-500"
          }`}
        >
          <option className="">เลือกหมวดหมู่</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
              className="text-orange-300"
            >
              {category.name}
            </option>
          ))}
        </select>
        <InputField
          placeholder="SKU"
          onChange={handleChangeInput}
          name="sku"
          value={productData.sku}
        />
        <InputField
          placeholder="ราคา"
          onChange={handleChangeInput}
          name="price"
          value={productData.price}
        />
        <InputField
          placeholder="แบรนด์"
          onChange={handleChangeInput}
          name="brand"
          value={productData.brand}
        />
        <InputField
          placeholder="จำนวนสต็อก"
          onChange={handleChangeInput}
          name="stock"
          value={productData.stock}
        />

        <textarea
          className="block w-full rounded-md px-4 py-3 outline-none border-gray-300 border focus:ring-1 focus:ring-green-500 focus:border-green-500 "
          placeholder="คำอธิบายสินค้า"
          name="desc"
          onChange={handleChangeInput}
          value={productData.desc}
          rows={4}
          cols={40}
        />
        <InputField
          placeholder="menu order"
          name="menu_order"
          value={productData.menu_order}
          onChange={handleChangeInput}
        />
        <button className="bg-blue-500 text-white p-8">ยืนยัน</button>
      </form>
    </>
  );
}
