import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import gearLoad from "../components/assets/Bean Eater@1x-1.0s-200px-200px.svg";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage({ base_url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("");
  // const [sort, setSort] = useState("ASC");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const pagination = getPagination();

  const navigate = useNavigate();

  // function getPagination() {
  //   let temp = [];
  //   for (let i = 1; i < totalPage; i++) {
  //     temp.push(i);
  //   }
  //   return temp;
  // }

  // function handlePrev() {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }

  // function handleNext() {
  //   if (currentPage < totalPage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      // console.log(data, "<<<<<<<<<<<<<<<<< data");
      setProducts(data.data);
      // setTotalPage(data.data.pagination.totalPage);
      // setCurrentPage(data.data.pagination.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchProducts();
  }

  useEffect(() => {
    // tdk boleh taruh fetchProducts di sini => akan infinite loop !!!!!
    // console.log(products, "<<<<<<<<<<<<<<<<< products");
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-md-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <>
          {/* =========================Product Section======================================= */}
          <section
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            id="product-section"
          >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              {/* Label Products  */}
              <h1 className="display-2">Products</h1>

              {/* New Product */}
              <button
                to="/add"
                className="btn btn-primary rounded-pill"
                id="new-product"
                onClick={() => navigate("/add")}
              >
                <span className="icon material-symbols-outlined">add</span>New
                Product
              </button>
            </div>

            <div className="row">
              <div className="col-12 table-responsive">
                <table className="table align-middle">
                  {/* judul table  */}
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col" width="180px">
                        Image
                      </th>
                      <th scope="col" width="250px">
                        Description
                      </th>
                      <th scope="col">Stock</th>
                      <th scope="col">Price</th>
                      <th scope="col">Author</th>
                      <th scope="col" width="30px" />
                    </tr>
                  </thead>

                  {/* List Products  */}
                  <tbody id="table-product">
                    {/* ini data looping */}
                    {products.map((product) => {
                      return (
                        <Card
                          key={product.id}
                          product={product}
                          base_url={base_url}
                          fetchProducts={fetchProducts}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* End Product Section */}
        </>
      )}
    </>
  );
}
