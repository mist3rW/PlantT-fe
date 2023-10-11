import InputField from "./InputField";
import SubmitBtn from "./SubmitBtn";

export default function ConfirmPaymentForm() {
  return (
    <div className="bg-[#FAFAFA] p-8 space-y-4">
      <p className="text-xl font-semibold">
        <span className="border-b-green-600 border-b-4">ยืนยันการชำระเงิน</span>
      </p>
      <div className="space-y-4">
        <InputField placeholder="ชื่อ" />
        <InputField placeholder="เบอร์ติดต่อ" />
        <InputField placeholder="หมายเลขคำสั่งซื้อ" />
        <InputField placeholder="ยอดโอน" />
        <p>บัญชีธนาคารที่โอน</p>
        <div className=" border border-gray-200 p-4 rounded-md">
          <div className="flex items-center h-5 p-8">
            <input
              id="helper-radio"
              type="radio"
              value=""
              className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300    "
            />
            <div className="ml-2 text-sm">
              <label
                htmlFor="helper-radio"
                className="font-medium text-gray-900 "
              >
                กสิกรไทย
              </label>
              <p
                id="helper-radio-text"
                className="text-xs font-normal text-gray-500 "
              >
                495-30218-4 บริษัท แพล้นที จำกัด
              </p>
            </div>
          </div>
        </div>
        <p>หลักฐานการโอน</p>

        <input
          className="mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
        <SubmitBtn>ยืนยัน</SubmitBtn>
      </div>
    </div>
  );
}
