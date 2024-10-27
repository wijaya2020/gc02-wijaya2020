import { useNavigate } from "react-router-dom";

export default function CardProduct({ product }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-red-400 border-2 border-black p-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-1">
          <img
            src={product.imgUrl}
            alt="product-image"
            className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1) mb-3] cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
          />
        </div>

        <div className="flex flex-col divide-y divide-black">
          <b className="mt-2 text-lg">{product.name}</b>
          <div>
            <p className="mt-1 text-sm">
              {product.description.length > 100
                ? product.description.substring(0, 100) + " . . ."
                : product.description}
            </p>
            <b className="mt-1 text-base">Price: Rp {product.price}</b>
          </div>
        </div>
      </div>
    </>
  );
}
