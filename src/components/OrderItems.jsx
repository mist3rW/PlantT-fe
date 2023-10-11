import CartItems from "./CartItems";
export default function OrderItems({ cart }) {
  return (
    <div className="space-y-4">
      <div>
        {cart.map((product) => (
          <div className="w-full border border-[B8B8B8] mb-2 shadow p-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <div className="">
                    <img src={product.img} alt="" className="w-auto h-12" />
                  </div>
                  <div className="flex flex-col">
                    <p>{product.title}</p>
                    <p>x {product.amount}</p>
                  </div>
                </div>
              </div>
              <span>฿{product.price}</span>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex justify-between">
        <p>ราคาสินค้ารวม</p>
        <p>฿1,989.00</p>
      </div>
      <hr />
      <div className="flex justify-between">
        <p>ค่าจัดส่ง</p>
        <p>฿50.00</p>
      </div>
      <hr />
      <div className="flex justify-between">
        <p>รวมทั้งหมด</p>
        <p>฿2,039.00</p>
      </div>
    </div>
  );
}
