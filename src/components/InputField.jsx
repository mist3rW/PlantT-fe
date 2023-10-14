export default function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  name,
  hasError,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={` 
        block w-full rounded-md px-4 py-3 outline-none border-gray-300 border focus:ring-1 focus:ring-green-500 focus:border-green-500 ${className} ${
        hasError
          ? "border-red-500 focus: ring-red-300"
          : "focus:ring-green-300 focus:border-green-300 border-gray-300"
      }`}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}
