import InputField from "../components/InputField";
import { useCart } from "../contexts/CartContext";
import CartItems from "../components/CartItems";
import ConfirmPaymentForm from "../components/ConfirmPaymentForm";
import OrderItems from "../components/OrderItems";

export default function ThankyouPage() {
  const { cart } = useCart();
  return (
    <div className="space-y-4">
      <div className="flex justify-center border border-green-700 border-dashed py-8">
        <p className="text-2xl text-[#3E834E]">
          ขอบคุณ คุณ เกรียงไกรกุ้กๆ เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว
        </p>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">หมายเลขคำสั่งซื้อ</p>
          <p>11226</p>
        </div>
        <div className="w-0.5 h-24 bg-gray-200"></div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">วันที่</p>
          <p> 1 ตุลาคม 2566</p>
        </div>
        <div className="w-0.5 h-24 bg-gray-200"></div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">ราคารวม</p>
          <p>฿2,226</p>
        </div>
        <div className="w-0.5 h-24 bg-gray-200"></div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">ช่องทางการชำระเงิน</p>
          <p>โอนเงินเข้าบัญชีธนาคาร</p>
        </div>
      </div>
      <hr />
      <ConfirmPaymentForm />
      <hr />
      <p className="text-xl font-semibold">รายละเอียดการสั่งซื้อ</p>
      <OrderItems cart={cart} />
      <hr />
    </div>
  );
}
