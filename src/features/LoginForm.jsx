import { useState } from "react";
import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";
import { useAuth } from "../hooks/use-auth";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function LoginForm({ closeModal }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    emailOrMobile: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    login(input)
      .then(() => {
        toast.success("Login Successfully!", {
          icon: "🚀",
        });
        setTimeout(() => {
          setLoading(false);
          closeModal();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      });
  };

  return (
    <>
      {loading && <Loading />}
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitForm}>
        <InputField
          placeholder="อีเมล หรือ เบอร์โทรศัพท์"
          className="col-span-full"
          value={input.emailOrMobile}
          name="emailOrMobile"
          onChange={handleChange}
        />
        <InputField
          placeholder="รหัสผ่าน"
          className="col-span-full"
          name="password"
          type="password"
          value={input.password}
          onChange={handleChange}
        />
        <SubmitBtn>เข้าสู่ระบบ</SubmitBtn>
      </form>
    </>
  );
}
