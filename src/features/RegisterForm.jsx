import { useState } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";

export default function RegisterForm() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <InputField placeholder="ชื่อ" />
        <InputField placeholder="นามสกุล" />
        <InputField
          placeholder="อีเมล หรือ เบอร์โทรศัพท์"
          className="col-span-full"
        />
        <InputField placeholder="รหัสผ่าน" className="col-span-full" />
        <InputField placeholder="ยืนยันรหัสผ่าน" className="col-span-full" />
        <SubmitBtn>สมัครสมาชิก</SubmitBtn>
      </div>
    </div>
  );
}
