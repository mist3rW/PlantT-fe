import ProductCard from "../components/ProductCard";
import list from "../utils/data.js";
import "./Archive.css";
import useProduct from "../hooks/use-product";

export default function Archive() {
  const { productList, setProductList } = useProduct();
  console.log(productList);
  return (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dkxh42dw1/image/upload/v1697017943/archive_hero_ag2fmo.jpg"
          alt=""
        />
      </div>
      <div className="grid grid-cols-4 gap-x-1 gap-y-10">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
