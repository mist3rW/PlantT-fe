import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";

export default function Contact() {
  return (
    <>
      <div className="py-10 space-y-10">
        <div className="flex justify-center flex-col items-center space-y-5">
          <h1 className="text-3xl">Contact Us</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            exercitationem voluptatem repellat.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <label htmlFor="">
            ชื่อ <InputField placeholder="ชื่อ" />
          </label>
          <label htmlFor="">
            เบอร์โทรศัพท์ <InputField placeholder="เบอร์โทรศัพท์" />
          </label>
          <label htmlFor="">
            อีเมล <InputField placeholder="อีเมล" />
          </label>
          <label htmlFor="" className="col-span-full">
            ข้อความ
            <textarea
              className="block w-full rounded-md px-4 py-3 outline-none border-gray-300 border focus:ring-1 focus:ring-green-500 focus:border-green-500 "
              placeholder="ข้อความของคุณ"
              name="contactMessage"
              rows={4}
              cols={40}
            />
          </label>
          <SubmitBtn>ยืนยัน</SubmitBtn>
        </div>
      </div>
    </>
  );
}
