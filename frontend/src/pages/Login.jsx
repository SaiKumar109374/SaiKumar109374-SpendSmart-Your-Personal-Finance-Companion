import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData)).then((response) => {
      // Check if the login was successful and a token is present in the response
      if (response.payload && response.payload.token) {
        localStorage.setItem("authToken", response.payload.token);
        // Redirect or perform other actions after successful login and token storage
        navigate("/"); // Example: Redirect to the home page
      }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        Link
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            <img className="mx-auto w-32" src="images/logo.png" alt="logo" />
          </Link>

          <h2
            className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight"
            style={{ color: "#63b0b8" }}
          >
            Login and start spending smart
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  placeholder="  Enter your email"
                  onChange={onChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  placeholder="  Enter password"
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#63b0b8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#7ad9dd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't Have An Account?{" "}
            <a
              href="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Signup here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
