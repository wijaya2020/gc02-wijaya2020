import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductForm({
  base_url,
  product,
  handleSubmit,
  nameProp,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      // console.log(data.data, "<<<<<<<<<<<<<<<<<<<<<< data.data");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setStock(product.stock || 0);
      setImgUrl(product.imgUrl || "");
      setCategoryId(product.categoryId || "");
    }
  }, [product]);

  return (
    <>
      {/* New Product Section */}
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">{nameProp}</h1>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <form
              id="product-form"
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  name,
                  description,
                  price,
                  imgUrl,
                  stock,
                  categoryId
                )
              }
            >
              <div className="mb-3">
                <label htmlFor="product-name">
                  Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-name"
                  placeholder="Enter product name"
                  autoComplete="off"
                  required=""
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="product-category">
                  Category <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  id="product-category"
                  className="form-select"
                  required=""
                  onChange={(e) => setCategoryId(e.target.value)}
                  value={categoryId}
                >
                  <option value="" disabled="">
                    -- Select Category --
                  </option>

                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="product-desc">
                  Description <span className="text-danger fw-bold">*</span>
                </label>
                <textarea
                  rows="4"
                  cols="150"
                  className="form-control"
                  id="product-desc"
                  placeholder="Enter product description"
                  autoComplete="off"
                  required=""
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="product-stock">
                      Stock <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      id="product-stock"
                      placeholder="Enter product stock"
                      autoComplete="off"
                      required=""
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="product-price">
                      Price <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      id="product-price"
                      placeholder="Enter product price"
                      autoComplete="off"
                      required=""
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="product-image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="product-image"
                  placeholder="Enter product image url"
                  autoComplete="off"
                  onChange={(e) => setImgUrl(e.target.value)}
                  value={imgUrl}
                />
              </div>

              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <Link
                    to="/"
                    className="btn btn-lg btn-light rounded-pill w-100 p-2"
                    href=""
                  >
                    Cancel
                  </Link>
                </div>
                <div className="col-6">
                  <button className="btn btn-lg btn-primary rounded-pill w-100 p-2">
                    {nameProp}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End New Product Section */}
    </>
  );
}
