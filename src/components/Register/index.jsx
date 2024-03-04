import { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = () => {
  const [registered, setRegister] = useState(false);
  const [errorMessage, setError] = useState({});
  const [passwordHidden, setPasswordHidden] = useState(true);

  const navigate = useNavigate();

  const onSuccess = (result) => {
    setRegister(true);
  };

  const onFailed = (result) => {
    setError(result);
  };

  const submitForm = async (formValues) => {
    const URL = "https://sheets-njt7.onrender.com/user/register";

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    try {
      const response = await fetch(URL, options);

      const result = await response.json();
      if (response.ok) {
        onSuccess(result);
      } else {
        onFailed(result);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      {!registered && (
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required*";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.username) errors.username = "Required*";
            if (!values.name) errors.name = "Required*";
            if (!values.password) {
              errors.password = "Required*";
            } else if (8 > values.password.length) {
              errors.password = "Minimum 8 characters";
            } else if (16 < values.password.length) {
              errors.password = "Maximum 16 characters";
            }
            if (!values.confirmpassword) {
              errors.confirmpassword = "Required*";
            } else if (values.password !== values.confirmpassword) {
              errors.confirmpassword = "Password is not matching";
            }
            return errors;
          }}
          // onSubmit={(values) => SubmitForm(values)}
          onSubmit={(values) => submitForm(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onBlur={handleBlur}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onFocus={() => setError({})}
              className="flex flex-col items-center py-3 px-4 gap-4"
            >
              <h1 className="text-2xl text-[#323268] font-bold">Register</h1>
              <div className="flex flex-col w-full ">
                <label className="text-[12px] font-[500]">NAME</label>
                <input
                  id="name"
                  className="bg-gray-200 p-1.5 text-[16px] rounded px-2 placeholder:text-gray-500"
                  type="text"
                  placeholder="Enter Name"
                />
                <p className="text-[11px] text-red-600">
                  {errors.name && touched.name && errors.name}
                </p>
              </div>
              <div className="flex flex-col w-full ">
                <label className="text-[12px] font-[500]">USERNAME</label>
                <input
                  className="bg-gray-200 p-1.5 text-[16px] rounded px-2 placeholder:text-gray-500"
                  type="text"
                  placeholder="Enter username"
                  id="username"
                />
                <p className="text-[11px] text-red-600">
                  {(errors.username && touched.username && errors.username) ||
                    errorMessage.usernameError}
                </p>
              </div>
              <div className="flex flex-col w-full ">
                <label className="text-[12px] font-[500]">Email </label>
                <input
                  className="bg-gray-200 p-1.5 text-[16px] rounded px-2 placeholder:text-gray-500"
                  type="email"
                  placeholder="Enter mail"
                  id="email"
                />
                <p className="text-[11px] text-red-600">
                  {(errors.email && touched.email && errors.email) ||
                    errorMessage.mailError}
                </p>
              </div>

              <div className="flex flex-col w-full ">
                <label className="text-[12px] font-[500]">PASSWORD </label>
                <div className="w-full flex items-center bg-gray-200 rounded">
                  <input
                    className="bg-gray-200 p-1.5 text-[16px] grow px-2   placeholder:text-gray-500 "
                    type={passwordHidden ? "password" : "text"}
                    placeholder="Password"
                    id="password"
                  />
                  <button
                    className="px-1.5"
                    type="button"
                    onClick={() => setPasswordHidden(!passwordHidden)}
                  >
                    {passwordHidden ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                </div>
                <p className="text-[11px] text-red-600">
                  {(errors.password && touched.password && errors.password) ||
                    errorMessage.passwordError}
                </p>
              </div>
              <div className="flex flex-col w-full ">
                <label className="text-[12px] font-[500]">
                  CONFIRM PASSWORD{" "}
                </label>
                <input
                  onFocus={() => (touched.confirmpassword = true)}
                  id="confirmpassword"
                  className="bg-gray-200 p-1.5 text-[16px] rounded px-2 placeholder:text-gray-500"
                  type="password"
                  placeholder="Confirm Password"
                />
                <p className="text-[11px] text-red-600">
                  {errors.confirmpassword &&
                    touched.confirmpassword &&
                    errors.confirmpassword}
                </p>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  id="submit"
                  disabled={isSubmitting}
                  className="bg-[#227a55] w-full py-1.5 rounded text-white "
                >
                  {isSubmitting ? "Registering" : "Register"}
                </button>
                <p className="text-[11px] text-red-600">{errorMessage.error}</p>
              </div>
            </form>
          )}
        </Formik>
      )}
      {registered && (
        <div className="success-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png"
            alt="success"
            height="90"
          />
          <p>SUCCESSFULLY REGISTERED</p>

          <p>verification link sent to your mail</p>

          <button
            onClick={() => navigate("/login")}
            className="successful-reg-btn"
            type="button"
          >
            LOGIN
          </button>
        </div>
      )}
    </>
  );
};

export default Register;
