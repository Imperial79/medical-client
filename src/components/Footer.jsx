import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Helper/ContextProvider";

function Footer() {
  const { setisScroll } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  let showFooter = true;

  if (location.pathname.includes("dashboard")) {
    showFooter = false;
  }
  return (
    <>
      <div className={`${showFooter ? "" : "hidden"}`}>
        <footer className="bg-gray-900">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Hirehelix
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <button
                      onClick={() => {
                        navigate("/");
                        setisScroll(true);
                      }}
                      className="hover:underline"
                    >
                      Job Profiles
                    </button>
                  </li>
                  <li className="mb-4">
                    <Link to="/jobs-recruiter" className="hover:underline">
                      Recruiters
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Help center
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link to="#" className="hover:underline">
                      X (Twitter)
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="#" className="hover:underline">
                      Facebook
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link
                      to="https://hirehelix.in/documents/privacy-policy.html"
                      target="_blank"
                      className="hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="https://hirehelix.in/documents/terms-conditions.html"
                      target="_blank"
                      className="hover:underline"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Download
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link to="#" className="hover:underline">
                      iOS
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="#" className="hover:underline">
                      Android
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 bg-gray-700 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © {new Date().getFullYear()} <Link to="">Hirehelix™</Link>. All
              Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
