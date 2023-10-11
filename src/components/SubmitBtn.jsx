export default function SubmitBtn({ children, className }) {
  return (
    <button
      className={`bg-green-700 text-white w-full rounded-md text-xl font-medium py-2.5 ${className}`}
    >
      {children}
    </button>
  );
}
