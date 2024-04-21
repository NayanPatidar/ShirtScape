import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nav";
import "./Signup.css";
import { SearchContext } from "../../contexts/contexts";
import { AuthContext } from "../../contexts/AuthContexts";

const Signup = () => {
  const { login, isUserLoggedIn } = useContext(AuthContext);
  const [ShowSignup, SetShowSignup] = useState(true);

  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(true);
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmit, setSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormError((prevFormError) => ({
      ...prevFormError,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      sendData();
    }
  }, [formError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(validateInput(formData));
    setSubmit(true);
  };

  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log("Signed Up Failed ");
        if (response.status == 400) {
          console.log("User Already Exist");
        }
        // throw new Error("Network response was not ok");
      } else {
        console.log("Signed Up!!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  const handlePasswordPaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: pastedText,
    }));
  };

  const validateInput = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required !";
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
      errors.username =
        "Invalid username. Use only letters, numbers, and underscores";
    }

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

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required !";
    } else if (values.confirmPassword != values.password) {
      errors.confirmPassword = "Passwords don't match !";
    }

    return errors;
  };

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
        " "
      ) : (
        <div className=" absolute z-10 flex items-center justify-center align-middle w-screen">
          <div className="SignupBox flex flex-col justify-start items-center  w-80 h-auto min-w-64 border-2  border-solid rounded-lg p-3 mt-20">
            <h1 className="SignupTitle text-2xl font-bold flex justify-center">
              Signup
            </h1>

            <div className=" w-11/12 h-max  text-black text-sm p-2">
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col pb-2">
                  <label className=" text-white pb-1 SignupEmail">Name</label>
                  <input
                    type="text"
                    name="username"
                    className="rounded h-8 pl-1 inputSignup"
                    onChange={handleInputChange}
                    value={formData.username}
                    required
                  />
                  <p className="text-red-600">{formError.username}</p>
                </div>
                <div className="flex flex-col pb-2">
                  <label className=" text-white pb-1 SignupEmail">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="rounded h-8 pl-1 inputSignup"
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                  />
                  <p className="text-red-600">{formError.email}</p>
                </div>
                <div className="flex flex-col pb-2">
                  <label className=" text-white pb-1 SignupEmail">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="rounded h-8 pl-1 inputSignup"
                    onChange={handleInputChange}
                    value={formData.password}
                    required
                  />
                  <p className="text-red-600">{formError.password}</p>
                </div>
                <div className="flex flex-col pb-2">
                  <label className="text-white pb-1 SignupEmail">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="rounded h-8 pl-1 inputSignup"
                    onChange={handleInputChange}
                    onPaste={handlePasswordPaste}
                    value={formData.confirmPassword}
                    required
                  />
                  <p className="text-red-600 ">{formError.confirmPassword}</p>
                </div>
                <button
                  type="submit"
                  className=" w-full bg-black text-white px-4 py-2 rounded-md mt-2 hover:underline "
                >
                  Sign Up
                </button>
                <p className="text-center self-center text-white SignupEmail">
                  Already have an account?{" "}
                  <a
                    className=" hover:underline cursor-pointer"
                    onClick={() => navigate("/signin")}
                  >
                    Log in here.
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

export default Signup;
