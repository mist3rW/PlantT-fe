import InputField from "../../../components/InputField";

export default function AddNewProduct() {
  return (
    <>
      <div className="mt-4 bg-[#fafafa] p-4 space-y-4">
        <p>ภาพประกอบสินค้า</p>

        <input
          className="mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
        <InputField placeholder="ชื่อสินค้า" />
        <InputField placeholder="หมวดหมู่" />
        <InputField placeholder="SKU" />
        <InputField placeholder="ราคา" />
        <InputField placeholder="แบรนด์" />
        <InputField placeholder="จำนวนสต็อก" />
        <textarea
          className="block w-full rounded-md px-4 py-3 outline-none border-gray-300 border focus:ring-1 focus:ring-green-500 focus:border-green-500 "
          placeholder="คำอธิบายสินค้า"
          name="contactMessage"
          rows={4}
          cols={40}
        />
        <InputField placeholder="menu order" />
        <button className="bg-blue-500 text-white p-8">ยืนยัน</button>
      </div>
    </>
  );
}
