import { useState } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";
import { useAuth } from "../hooks/use-auth";
import ErrorInputField from "../components/ErrorInputField";
import Loading from "../components/Loading";
import LoginForm from "./LoginForm";

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const { register } = useAuth();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validationError = validateRegister(input);
    if (validationError) {
      return setError(validationError);
    }
    setError({});
    setLoading(true);
    register(input)
      .then(() => {
        toast.success("Register Successfully!");
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {loading && <Loading />}

      <>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitForm}>
          <InputField
            placeholder="ชื่อ"
            name="firstName"
            value={input.firstName}
            onChange={handleChangeInput}
            hasError={error.firstName}
          />

          <InputField
            placeholder="นามสกุล"
            name="lastName"
            value={input.lastName}
            onChange={handleChangeInput}
            hasError={error.lastName}
          />
          <div>
            {error.firstName && <ErrorInputField message={error.firstName} />}
          </div>
          <div>
            {error.lastName && <ErrorInputField message={error.lastName} />}
          </div>
          <InputField
            placeholder="อีเมล หรือ เบอร์โทรศัพท์"
            name="emailOrMobile"
            className="col-span-full"
            value={input.emailOrMobile}
            onChange={handleChangeInput}
            hasError={error.emailOrMobile}
          />
          {error.emailOrMobile && (
            <ErrorInputField message={error.emailOrMobile} />
          )}
          <InputField
            placeholder="รหัสผ่าน"
            name="password"
            type="password"
            value={input.password}
            onChange={handleChangeInput}
            hasError={error.password}
            className="col-span-full"
          />
          {error.password && <ErrorInputField message={error.password} />}
          <InputField
            placeholder="ยืนยันรหัสผ่าน"
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChangeInput}
            hasError={error.confirmPassword}
            className="col-span-full"
          />
          {error.confirmPassword && (
            <ErrorInputField message={error.confirmPassword} />
          )}
          <SubmitBtn>สมัครสมาชิก</SubmitBtn>
        </form>
      </>
    </div>
  );
}
