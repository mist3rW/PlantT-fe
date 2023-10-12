import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";

export default function LoginForm() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          placeholder="อีเมล หรือ เบอร์โทรศัพท์"
          className="col-span-full"
        />
        <InputField placeholder="รหัสผ่าน" className="col-span-full" />
        <SubmitBtn>เข้าสู่ระบบ</SubmitBtn>
      </div>
    </>
  );
}
