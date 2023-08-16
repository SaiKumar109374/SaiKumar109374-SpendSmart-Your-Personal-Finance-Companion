import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const pages = ["/", "/incomes", "/expenses", "/CurrencyConverter"];
  const currentPageIndex = pages.indexOf(location.pathname);

  const [activeSection, setActiveSection] = useState(location.pathname);

  const onLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSectionClick = (path) => {
    setActiveSection(path);
  };

  const goToNextPage = () => {
    const nextPageIndex = (currentPageIndex + 1) % pages.length;
    navigate(pages[nextPageIndex]);
  };

  const goToPreviousPage = () => {
    const previousPageIndex =
      (currentPageIndex - 1 + pages.length) % pages.length;
    navigate(pages[previousPageIndex]);
  };

  return (
    <>
      <header className="fixed right-0 top-0 left-60 bg-green-100 py-3 px-4 h-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={goToPreviousPage}
                className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-green-600 focus:text-green-600 font-semibold p-2 border border-transparent hover:border-green-300 focus:border-green-300 transition"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </span>
                <span className="text-sm">Previous Page</span>
              </button>
            </div>
            <div className="text-lg font-bold">
              Welcome, {user && user.name}
            </div>
            <div>
              <button
                type="button"
                onClick={goToNextPage}
                className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-green-600 focus:text-green-600 font-semibold p-2 border border-transparent hover:border-green-300 focus:border-green-300 transition"
              >
                <span className="text-sm">Next Page</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b">
              <h1 className="text-xl font-bold leading-none">
                <span className="text-teal-700">Spend</span> Smart
              </h1>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <a
                    href="/"
                    onClick={() => handleSectionClick("/")}
                    className={`flex items-center rounded-xl font-bold text-sm text-black py-3 px-4 ${
                      activeSection === "/"
                        ? "bg-green-200"
                        : "bg-white hover:bg-yellow-50"
                    }`}
                  >
                    <div className="w-8 h-8 mr-4">
                      <BiSolidDashboard size={24} />{" "}
                      {/* Replace the SVG icon with the IoLogOut icon */}
                    </div>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/incomes"
                    onClick={() => handleSectionClick("/incomes")}
                    className={`flex items-center rounded-xl font-bold text-sm text-gray-900 py-3 px-4 ${
                      activeSection === "/incomes"
                        ? "bg-green-200"
                        : "bg-white hover:bg-yellow-50"
                    }`}
                  >
                    <div className="w-8 h-8 mr-4">
                      <GiReceiveMoney size={24} />{" "}
                      {/* Replace the SVG icon with the IoLogOut icon */}
                    </div>
                    Incomes
                  </a>
                </li>
                <li>
                  <a
                    href="/expenses"
                    onClick={() => handleSectionClick("/expenses")}
                    className={`flex items-center rounded-xl font-bold text-sm text-gray-900 py-3 px-4 ${
                      activeSection === "/expenses"
                        ? "bg-green-200"
                        : "bg-white hover:bg-yellow-50"
                    }`}
                  >
                    <div className="w-8 h-8 mr-4">
                      <GiTakeMyMoney size={24} />{" "}
                      {/* Replace the SVG icon with the IoLogOut icon */}
                    </div>
                    Expenses
                  </a>
                </li>
                <li>
                  <a
                    href="/CurrencyConverter"
                    onClick={() => handleSectionClick("/CurrencyConverter")}
                    className={`flex items-center rounded-xl font-bold text-sm text-gray-900 py-3 px-4 ${
                      activeSection === "/CurrencyConverter"
                        ? "bg-green-200"
                        : "bg-white hover:bg-yellow-50"
                    }`}
                  >
                    <div className="w-8 h-8 mr-4">
                      <FaMoneyBillTransfer size={24} />{" "}
                      {/* Replace the SVG icon with the IoLogOut icon */}
                    </div>
                    Currency Converter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
            >
              <IoLogOut size={16} className="mr-2" /> Logout
            </button>{" "}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Header;
