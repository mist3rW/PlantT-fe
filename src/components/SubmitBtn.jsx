export default function SubmitBtn({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-green-700 text-white w-full rounded-md text-xl font-medium py-2.5 ${className}`}
    >
      {children}
    </button>
  );
}
