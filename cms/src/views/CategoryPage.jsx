import { useEffect, useState } from "react";
// import Card from "../components/Card";
import axios from "axios";
import gearLoad from "../components/assets/Bean Eater@1x-1.0s-200px-200px.svg";
import { Link, useNavigate } from "react-router-dom";

export default function CategoryPage({ base_url }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      setLoading(true);
      // mesti login dulu
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      // console.log(data.data, "<<<<<<<<<<<<<<<<< data");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // tdk boleh taruh fetchProducts di sini => akan infinite loop !!!!!
    // console.log(categories, "<<<<<<<<<<<<<<<<< categories");
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Category Section */}

      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="category-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          {/* Label Categories  */}
          <h1 className="display-2">Categories</h1>

          {/* New Category */}
          {/* <button
            to=""
            className="btn btn-primary rounded-pill"
            id="new-category"
            onClick={() => navigate("")}
          >
            <span className="icon material-symbols-outlined">add</span>
            New Category
          </button> */}
        </div>

        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table align-middle">
              {/* judul table  */}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>

              {/* List Categories  */}
              <tbody id="table-category">
                {/* ini data looping */}
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td scope="row">#{category.id}</td>
                    <td className="fw-bold">{category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* End Category Section */}
    </>
  );
}
