import ProductCard from "../components/ProductCard";
import list from "../utils/data.js";
import "./Archive.css";

export default function Archive() {
  return (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dkxh42dw1/image/upload/v1697017943/archive_hero_ag2fmo.jpg"
          alt=""
        />
      </div>
      <div className="grid grid-cols-3 gap-y-10">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
