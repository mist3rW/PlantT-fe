import RegisterBtn from "../features/RegisterBtn";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProduct from "../hooks/use-product";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { productList, setProductList } = useProduct();
  return (
    <>
      {/* Hero Section */}

      <main className="space-y-10">
        <section>
          <div className=" grid grid-cols-2 place-items-center">
            <div className=" p-9 flex flex-col justify-evenly space-y-10">
              <h1 className="text-6xl abril">
                Think <span className="plant-hero-gd">Green</span> and <br />{" "}
                Plant <span className="plant-hero-gd">Something</span>
              </h1>
              <p>
                ยินดีต้อนรับสู่ PlantT <br />
                เราช่วยให้คุณดูแลธรรมชาติด้วยผลิตภัณฑ์ทำสวนออร์แกนิกระดับพรีเมียมของเรา
                ความมุ่งมั่นของเราต่อความยั่งยืนในการปลูก คุณภาพ
                และความเป็นอยู่ที่ดีของพืชเป็นสิ่งสำคัญ
              </p>
              <div>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  เข้าชมสินค้า
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-green-800 border border-green-700 hover:text-white bg-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  ดูวิดีโอของเรา&nbsp;
                  <FontAwesomeIcon icon={faCirclePlay} />
                </button>
              </div>
            </div>
            <div>
              <img src="/plant-hero.png" alt="" />
            </div>
          </div>
        </section>
        {/* 3 cards about branding */}
        <section>
          <div className="flex justify-center">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* Icon card 1 */}
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  สินค้าคุณภาพระดับโลก
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                เสนอตัวเลือกปุ๋ยที่อุดมไปด้วยสารอาหารที่สำคัญ
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                เข้าร่วมกับเราบนเว็บไซต์ของเราและค้นหาปุ๋ยและ
                ผลิตภัณฑ์คุณภาพที่เหมาะกับสวนของคุณ
              </p>
            </div>
            <div className="max-w-sm p-6 bg-[#014B40] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* Icon card 2 */}
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
                  โภชนาการที่สำคัญสำหรับพืช
                </h5>
              </a>
              <p className="mb-3 font-normal text-[#ADADAD] ">
                สารอาหารพืชที่ปราศจากสารเคมี
              </p>
              <p className="mb-3 font-normal text-[#ADADAD] ">
                ส่งเสริมการเติบโตและความมีชีวิตชีวาที่แข็งแกร่ง
                ที่ได้มาจากส่วนผสมออร์แกนิก 100%
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* Icon card 3 */}
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  การเก็บเกี่ยวที่ได้มากกว่า
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                รวบรวมปุ๋ยน้ำอินทรีย์ที่ดีที่สุด
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                สารกระตุ้นจากธรรทชาติแบบออร์แกนิกที่อุดมไป ด้วยกรดฮิวมิก
                ยกระดับการเก็บเกี่ยวผลผลิต
              </p>
            </div>
          </div>
        </section>
        {/* Featured Product */}
        <section className="grid grid-cols-4 gap-4">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
}
