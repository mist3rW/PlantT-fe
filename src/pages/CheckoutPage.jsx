import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";
import { useCart } from "../contexts/CartContext";
import CartItems from "../components/CartItems";

export default function CheckoutPage() {
  const { cart, handleClickRemoveCartItems } = useCart();
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 md:col-span-1 md:w-70 space-y-4">
        <img src="../../public/plant_checkout_bg.jpg" alt="" />
        <div className="space-y-4">
          <p className="text-xl font-semibold">ข้อมูลในการจัดส่ง</p>
          <div className="grid grid-cols-2 gap-4">
            <InputField placeholder="อีเมล" className="col-span-full" />
            <InputField placeholder="เบอร์โทรศัพท์" className="col-span-full" />
            <InputField placeholder="ชื่อ" />
            <InputField placeholder="นามสกุล" />
            <InputField
              placeholder="บ้านเลขที่และที่อยู่ถนน"
              className="col-span-full"
            />
            <InputField placeholder="ตำบล/แขวง" />
            <InputField placeholder="อำเภอ/เขต" />
            <InputField placeholder="จังหวัด" />
            <InputField placeholder="รหัสไปรษณีย์" />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold">วิธีการจัดส่งสินค้า</p>
          <div className="flex justify-between p-4 border border-gray-200 rounded-md">
            <p>EMS</p>
            <p>฿50</p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold">วิธีการชำระเงิน</p>
          <div className=" border border-gray-200 p-4 rounded-md">
            <div className="flex items-center h-5 p-8">
              <input
                id="helper-radio"
                type="radio"
                value=""
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300    "
              />
              <div className="ml-2 text-sm ">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 "
                >
                  โอนเข้าบัญชีธนาคาร
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 "
                >
                  สามารถชำระค่าสินค้าโดยตรงด้วยการโอนเข้าบัญชีของเรา โปรดใช้เลข
                  Order Number ในการอ้างอิงกับการชำระเงิน
                  สินค้าของคุณจะไม่ถูกจัดส่งจนกว่าจะได้รับการยืนยันการชำระเงินในบัญชีของเรา
                </p>
              </div>
            </div>
          </div>
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
                  เก็บเงินปลายทาง
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 "
                >
                  ชำระเงินเมื่อได้รับสินค้า
                </p>
              </div>
            </div>
          </div>
          <hr />
          <p className="text-xs font-normal text-gray-500">
            ข้อมูลส่วนบุคคลของคุณจะถูกใช้เพื่อดำเนินการสั่งซื้อของคุณ
            และเพื่อวัตถุประสงค์อื่นที่อธิบายไว้ในนโยบายของเรา
          </p>
          <hr />
          <SubmitBtn>ยืนยัน</SubmitBtn>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 md:w-30 bg-[#fafafa] p-4">
        <div className="space-y-4">
          <p className="text-xl font-semibold">สินค้าจากตะกร้า</p>
          <div>
            {cart.map((product) => (
              <CartItems
                key={product.id}
                product={product}
                handleClick={handleClickRemoveCartItems}
              />
            ))}
          </div>
          <hr />
          <div className="flex justify-between">
            <p>ราคารวม</p>
            <p>฿1,989.00</p>
          </div>
          <div className="flex justify-between">
            <p>ค่าจัดส่ง</p>
            <p>฿50.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className=" text-lg">รวมทั้งหมด</p>
            <p>฿2,039.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
