import { Formik } from "formik";
import React from "react";

import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import user from "../users.json";

import { jwtDecode } from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";

import { addData } from "../Slice/Slice";
import Cookies from "js-cookie";

function Add() {
  const token = Cookies.get("jwt_token");

  const decoded = jwtDecode(token);
  console.log(decoded);
  const dispatch = useDispatch();

  return (
    <Popup
      modal
      trigger={
        <button
          className="w-32 bg-gray-600 text-white rounded-full py-1 px-3 shadow-[0px_3px_5px_#00000020] hover:shadow-[0px_0px_#777] transition-shadow"
          type="button"
        >
          Add
        </button>
      }
    >
      {(close) => (
        <div>
          <Formik
            initialValues={{
              name: decoded.username,
              template_name: "",
              completed_today: "",
              // totalComponents: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) errors.name = "Required*";
              if (!values.template_name) errors.template_name = "Required*";
              if (!values.completed_today) errors.completed_today = "Required*";
              // if (!values.totalComponents) errors.totalComponents = "Required*";

              return errors;
            }}
            onSubmit={(values) => {
              dispatch(addData(values));
              close();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-3 gap-4 flex flex-col"
              >
                <h1 className="text-[18px] font-[500]">Add Pack Details</h1>
                <div className=" grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 gap-y-3">
                  {decoded.isAdmin && (
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-[500]">
                        Name of Editor
                      </label>
                      <input
                        className="bg-gray-200 text-[15px] p-1 outline-none p-1  rounded-sm"
                        id="name"
                        list="users"
                      />
                      <p className="text-[11px] text-red-500">
                        {errors.name && touched.name && errors.name}
                      </p>
                      <datalist id="users">
                        {user.map((value) => (
                          <option value={value.name} key={value.name} />
                        ))}
                      </datalist>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-[500]">Pack name</label>
                    <input
                      className="bg-gray-200 text-[15px]  outline-none p-1 rounded-sm"
                      id="template_name"
                    />
                    <p className="text-[11px] text-red-500">
                      {errors.template_name &&
                        touched.template_name &&
                        errors.template_name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[15px] font-[500]">
                      completed today
                    </label>
                    <input
                      className="bg-gray-200 text-[15px]  outline-none p-1   rounded-sm"
                      id="completed_today"
                      type="number"
                    />
                    <p className="text-[11px] text-red-500">
                      {errors.completed_today &&
                        touched.completed_today &&
                        errors.completed_today}
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  id="sub"
                  className="bg-gray-700 rounded text-white tracking-wider p-1"
                >
                  Add
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </Popup>
  );
}

export default Add;
