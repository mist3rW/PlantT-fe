export default function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="block w-full rounded-md px-4 py-3 outline-none border-gray-300 border focus:ring-1 focus:ring-green-500 focus:border-green-500"
      value={value}
      onChange={onChange}
    />
  );
}
