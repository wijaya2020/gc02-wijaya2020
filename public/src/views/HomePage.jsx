import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Toastify from "toastify-js";
import loadingAnimation from "../components/assets/Spinner@1x-1.0s-200px-200px.svg";
// import NavBar from "../components/NavBar";
// import productJson from "../../data/products.json";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("ASC");
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        // `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products?q=${search}&i=${filter}&limit=8&page=1&sort=${sort}`

        `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products`,
        {
          params: {
            q: search,
            limit: 8,
            page: currentPage,
            sort: sort,
            i: filter,
          },
        }
      );
      // console.log(
      //   data.data.pagination.totalPage,
      //   "<<<<<<<<<<<<<<<<<<<<<<< data.data.pagination.totalPage"
      // );
      // console.log(
      //   data.data.pagination.currentPage,
      //   "<<<<<<<<<<<<<<<<<<<<<<< data.data.pagination.currentPage"
      // );

      setProducts(data.data.query);
      setTotalPage(data.data.pagination.totalPage);
      setCurrentPage(data.data.pagination.currentPage);
    } catch (error) {
      // console.log(error);
      Toastify({
        text: error.response?.data?.error,
        duration: 2000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/categories`
      );

      setCategories(data.data);
    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((page) => page + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // 2. lifecycle mounted => jalan sekali aja sebelum nge-render halaman home
  useEffect(() => {
    fetchCategories();
  }, []);

  // 3. lifecycle watcher  => jalan sekali aja sebelum nge-render halaman home, dan watch perubahan di search
  useEffect(() => {
    fetchProducts();
  }, [filter, sort, search, currentPage]);

  return (
    <>
      <div id="page-home">
        <div className="sticky top-0 z-10 p-3 bg-purple-400 flex flex-row justify-end items-center border-2 border-black mx-3.5 py-1 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] ">
          <form
            action=""
            method="get"
            className="flex items-center w-full max-w-4xl"
            onSubmit={(e) => {
              e.preventDefault();
              fetchProducts();
            }}
          >
            {/* search */}
            <div className="p-5 text-lg ">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="w-full max-w-full border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] -4 py-2 px-4  focus:outline-none focus:ring-0"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* filter */}
            <div className="p-5 text-lg ">
              <label>Filter : </label>
              <select
                name="filter"
                className="flex-grow border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] -4 py-2 px-4  focus:outline-none focus:ring-0"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Category</option>
                {categories.map((el) => {
                  return (
                    <option value={el.name} key={el.id}>
                      {el.name}{" "}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="p-5 text-lg ">
              {/* sort  */}
              <label>Sort : </label>
              <select
                name="sort"
                className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] -4 py-2 px-4  focus:outline-none focus:ring-0"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </div>
          </form>
        </div>
        {loading ? (
          <>
            <div className="flex justify-center items-center h-screen">
              {/* <b className="text-4xl">Loading...</b> */}
              <img src={loadingAnimation} />
            </div>
          </>
        ) : (
          <>
            <main className="mt-2 mb-4 mx-4 grid grid-cols-3 gap-5">
              {products.map((product) => {
                return (
                  // panggil CardProduct, sekalian setProduct
                  <Card product={product} key={product.id} />
                );
              })}
            </main>
          </>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 px-3 text-lg font-medium">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPage)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`border-b-2 ${
                  currentPage == page
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" // Inactive page styles
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPage}
          >
            Next
          </button>

          <br />
          <br />
        </div>
      </div>
    </>
  );
}
