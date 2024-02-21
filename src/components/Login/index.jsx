import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Formik } from "formik";

import Cookies from "js-cookie";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";

const Login = () => {
  const [errorMessage, setError] = useState("");

  const [isVerifiedUser, setVerifiedUser] = useState(true);

  const [passwordHidden, setPasswordHidden] = useState(true);

  const navigate = useNavigate();

  const onSuccess = (result) => {
    Cookies.set("jwt_token", result.jwtToken, {
      expires: 30,
      path: "/",
    });

    navigate("/", { replace: true });
  };

  const onFailed = (result, response) => {
    if (response.status === 401) {
      setError(result.error);
      setVerifiedUser(false);
    } else {
      setError(result.error);
    }
  };

  const submitForm = async (formValues, { setSubmitting }) => {
    try {
      var options = {
        method: "POST",
        url: "https://sheets-njt7.onrender.com/user",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: formValues,
      };

      const response = await axios.request(options);

      onSuccess(response.data);
    } catch (error) {
      if (error.response.status === 403) {
        setVerifiedUser(false);
      }
      setError(error.response.data.error);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.username) errors.username = "Required*";
        if (!values.password) errors.password = "Required*";

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        submitForm(values, { setSubmitting });
      }}
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
        <>
          <form
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            onFocus={() => {
              setError("");
            }}
            className="flex flex-col items-center py-3 px-4 gap-4"
          >
            <h1 className="text-2xl text-[#323268] font-bold">Login</h1>
            <div className="flex flex-col w-full ">
              <label htmlFor="username" className="text-[12px] font-[500]">
                USERNAME
              </label>
              <input
                className="bg-gray-200 p-1.5 text-[16px] rounded px-2 placeholder:text-gray-500"
                type="text"
                placeholder="Enter username"
                id="username"
              />
              <p className="text-[11px] text-red-600">
                {errors.username && touched.username && errors.username}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-[12px] font-[500]">
                PASSWORD{" "}
              </label>
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
                  id="setP"
                  onClick={() => setPasswordHidden(!passwordHidden)}
                >
                  {passwordHidden ? <IoMdEye /> : <IoMdEyeOff />}
                </button>
              </div>
              <p className="text-[11px] text-red-600">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <div className="w-full py-5 pb-2">
              <button
                type="submit"
                id="login"
                disabled={isSubmitting}
                className="bg-[#227a55] w-full py-1.5 rounded text-white disabled:bg-[#62c69c]"
              >
                {isSubmitting ? "Logging" : "Log in"}
              </button>

              <p className="text-[13px] text-red-600">{errorMessage}</p>
            </div>
          </form>
          {!isVerifiedUser && (
            <div className="w-full flex justify-center items-center py-3">
              <Link
                to="/resend"
                className="bg-slate-700 text-white p-1 px-3 text-[12px] rounded hover:shadow-[3px_3px_8px_#00000030]"
              >
                Resend Mail
              </Link>
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export default Login;
