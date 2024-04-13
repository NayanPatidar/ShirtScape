import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nav";
import "./Signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const [isSubmit, setSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    formError[name] = "";
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
    } else if (
      !/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)
    ) {
      errors.password =
        "8 characters, at least one number and one special character";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log("Signed In");
    }
  }, [formError]);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
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
    </>
  );
};
export default Signin;
