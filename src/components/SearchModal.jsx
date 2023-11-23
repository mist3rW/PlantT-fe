export default function SearchModal({
  title,
  children,
  maxWidth = 27,
  open,
  onClose,
}) {
  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-20"></div>
          <div className="fixed inset-0 z-30 rounded-xl">
            <div className="flex justify-center items-center min-h-full  shadow-lg">
              <div
                className="rounded-lg w-full bg-white shadow-2xl border"
                style={{ maxWidth: `${maxWidth}rem` }}
              >
                <div className="flex justify-between p-2 text-xl bg-[#fafafa]">
                  <div className="invisible">X</div>
                  <div className="font-bold">{title}</div>
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={onClose}
                  >
                    X
                  </div>
                </div>
                <div className="">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
