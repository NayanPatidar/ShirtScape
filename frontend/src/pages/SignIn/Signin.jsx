import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nav";
import "./Signin.css";
import { SearchContext } from "../../contexts/contexts";
import { AuthContext } from "../../contexts/AuthContexts";

const JWT_SECRET_KEY = "aqwerdftgh";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Signin = () => {
  const { login, isUserLoggedIn } = useContext(AuthContext);

  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const [backendError, setBackendError] = useState();

  const [isSubmit, setSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    formError[name] = "";
    setBackendError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validateInput(formData));
    setSubmit(true);
  };

  const validateInput = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required !";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required !";
    }

    return errors;
  };

  const sendLoginDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.message) {
        console.log(`Error: ${data.message}`);
        setBackendError(data.message);
      } else {
        console.log("Logged In!!");
        document.cookie = `sscape=${data.token}; expires=${new Date(
          Date.now() + 43200000
        ).toUTCString()}; path=/`;
        navigate("/profile");
        login();
      }
    } catch (error) {
      console.error("Error during login: ", error.message);
    }
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      sendLoginDetails();
    }
  }, [formError]);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/profile");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {isUserLoggedIn ? (
        ""
      ) : (
        <div className="absolute z-10 flex items-center justify-center align-middle w-screen h-screen">
          <div className="SigninBox flex flex-col justify-start items-center w-80 h-auto min-w-64  border-2  border-solid border-gray-200 rounded-lg p-3">
            <h1 className="SigninTitle text-2xl font-bold  flex justify-center">
              Login
            </h1>

            <div className=" w-11/12 h-max m-3 text-black text-sm p-2">
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col pb-2">
                  <label className="SigninEmail pb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="rounded h-8 pl-1 inputSignin"
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                  />
                  <p className="text-red-600">{formError.email}</p>
                </div>
                <div className="flex flex-col pb-2">
                  <label className="SigninPassword text-white pb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="rounded h-8 pl-1 inputSignin"
                    onChange={handleInputChange}
                    value={formData.password}
                    required
                  />
                  <p className="text-red-600">{formError.password}</p>
                  <p className="text-red-600">{backendError}</p>
                </div>
                <button
                  type="submit"
                  className=" w-full bg-black text-white px-4 py-2 rounded-md mt-5 hover:underline "
                >
                  Sign In
                </button>
                <p className="SigninAccount text-center self-center text-white pt-4">
                  Don't have an account?{" "}
                  <a
                    className=" hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    <br />
                    Create a account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Signin;
