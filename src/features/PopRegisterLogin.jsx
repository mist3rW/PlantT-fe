import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function PopRegisterLogin() {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };
  return (
    <>
      <div className="grid grid-cols-2">
        {/* Left Side  */}
        <div className="bg-[#3e834e] flex flex-col justify-center items-center space-y-4 py-4">
          <h1 className="text-white">Welcome to</h1>
          <div>
            <img
              src="../../public/plantt-logo-white.svg"
              alt=""
              width="50px"
              height="50px"
            />
          </div>
          <p className="text-white text-xs w-48">
            สมัครสมาชิกกับแพล้นที รับสิทธิพิเศษ และส่วนลดสินค้า
            อัพเดทล่าสุดก่อนใคร
          </p>
          <div className="p-8">
            <img src="../../public/plantt-vector.svg" alt="" />
          </div>
        </div>
        {/* Right Side */}
        <div className="space-y-4 p-4">
          {/* //! Register */}
          <div className="space-y-2">
            <p className="font-semibold text-xl">
              {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </p>
            <p>
              {isRegister ? "เป็นสมาชิกอยู่แล้ว?" : "ยังไม่ได้เป็นสมาชิก?"}
              &nbsp;&nbsp;
              <span
                className="font-semibold text-green-700 cursor-pointer"
                onClick={toggleForm}
              >
                {isRegister ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex justify-center">
              <button className="bg-[#f6f6f7] px-6 py-4 rounded-[50px] flex text-xs items-center gap-2">
                <img
                  src="../../public/google-logo.svg"
                  alt=""
                  style={{ height: 30, width: 30 }}
                />
                CONTINUE WITH GOOGLE
              </button>
            </div>
            <div className="flex justify-center">
              <button className="bg-[#1977f2] px-6 py-4 rounded-[50px] flex text-white text-xs items-center gap-2">
                <img
                  src="../../public/facebook-logo.svg"
                  alt=""
                  style={{ height: 30, width: 30 }}
                />
                CONTINUE WITH FACEBOOK
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center py-4">
            <div className="bg-[#E7E9E6] h-[1px] w-[80px]"></div>
            <p className="text-xs text-gray-500">
              &nbsp;&nbsp;&nbsp;&nbsp;หรือ&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <div className="bg-[#E7E9E6] h-[1px] w-[80px]"></div>
          </div>
          <div>{isRegister ? <RegisterForm /> : <LoginForm />}</div>
        </div>
      </div>
    </>
  );
}
