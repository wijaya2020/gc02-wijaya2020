import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("login");
  }

  return (
    <>
      {/* Navbar */}
      <header
        className="navbar sticky-top bg-white flex-md-nowrap p-0 shadow"
        id="navbar"
      >
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
          {" "}
          <img
            src="./image/IDEA_logo.svg"
            width={80}
            className="d-inline-block me-2"
            alt="IDEA"
          />
          Admin Panel
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </header>
      {/* End Navbar --
       */}

      <section className="container-fluid" id="home-section">
        <div className="row">
          {/* Sidebar */}

          <nav
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            id="sidebar-menu"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                {/* Products */}
                <li className="nav-item">
                  <Link to="/" className="nav-link" id="nav-product">
                    {" "}
                    <span className="icon material-symbols-outlined me-2">
                      shopping_bag
                    </span>
                    Products
                  </Link>
                </li>

                {/* Category */}
                <li className="nav-item">
                  <Link to="/categories" className="nav-link" id="nav-category">
                    {" "}
                    <span className="icon material-symbols-outlined me-2">
                      category
                    </span>
                    Categories
                  </Link>
                </li>

                {/* Add User */}
                <li className="nav-item">
                  <Link to="/addUser" className="nav-link" id="nav-category">
                    {" "}
                    <span className="icon material-symbols-outlined me-2">
                      account_circle
                    </span>
                    Add User
                  </Link>
                </li>
              </ul>

              {/* -------------- Account sidebar ------------------ */}
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                <span>Account</span>
              </h6>
              <ul className="nav flex-column mb-2">
                {/* Username */}
                <li className="nav-item">
                  <a className="nav-link">
                    {" "}
                    <span className="icon material-symbols-outlined me-2">
                      person
                    </span>
                    Hej, <span id="username">Hacktiv8!</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="nav-logout"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <span className="icon material-symbols-outlined me-2">
                      logout
                    </span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* End Sidebar */}
        </div>
      </section>
    </>
  );
}
