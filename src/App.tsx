import { useQuery } from "@tanstack/react-query";
import "./index.css";
import { getAllProducts } from "./services/productService";
import { LuRefreshCcw } from "react-icons/lu";

interface Product {
  title: string;
  price: string;
}

function App() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  console.log("data", data);

  const handleRefresh = () => refetch();

  return (
    <>
      <div className="h-screen flex flex-col items-center m-20">
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold underline">Products</h1>
          <button
            onClick={handleRefresh}
            className="bg-gray-400 hover:bg-gray-500 p-2 rounded cursor-pointer"
          >
            <LuRefreshCcw className="text-white" />
          </button>
        </div>

        <div className="w-11/12 flex justify-center flex-wrap gap-2 m-5">
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            <>
              {data.products.map((product: Product) => (
                <div className="bg-blue-300 hover:bg-blue-400 p-5 rounded-2xl cursor-pointer">
                  <p className="text-base font-bold">{product.title}</p>
                  <p className="text-sm">$ {product.price}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
