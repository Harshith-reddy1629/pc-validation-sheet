import { Formik } from "formik";
import React from "react";

import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import user from "../users.json";
import { useDispatch, useSelector } from "react-redux";

import { addData, getAllData } from "../Slice/Slice";

function Add() {
  const dispatch = useDispatch();

  return (
    <Popup
      modal
      trigger={
        <button className="w-32 bg-gray-300 rounded py-1 px-3" type="button">
          Add
        </button>
      }
    >
      {(close) => (
        <div>
          <Formik
            initialValues={{
              username: "",
              packname: "",
              completed: "",
              totalComponents: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.username) errors.username = "Required*";
              if (!values.packname) errors.packName = "Required*";
              if (!values.completed) errors.completed = "Required*";
              if (!values.totalComponents) errors.totalComponents = "Required*";

              return errors;
            }}
            onSubmit={(values) => {
              console.log(values);
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
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-[500]">
                      Name of Editor
                    </label>
                    <input
                      className="bg-gray-200 outline-none p-1 py-0.5 rounded-sm"
                      id="username"
                      list="users"
                    />
                    <p className="text-[11px] text-red-500">
                      {errors.username && touched.username && errors.username}
                    </p>
                    <datalist id="users">
                      {user.map((value) => (
                        <option value={value.name} key={value.name} />
                      ))}
                    </datalist>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-[500]">Pack name</label>
                    <input
                      className="bg-gray-200 outline-none p-1 py-0.5 rounded-sm"
                      id="packname"
                    />
                    <p className="text-[11px] text-red-500">
                      {errors.packName && touched.packName && errors.packName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-[500]">
                      Total Screens
                    </label>
                    <input
                      className="bg-gray-200 outline-none p-1 py-0.5 rounded-sm"
                      id="totalComponents"
                      type="number"
                    />
                    <p className="text-[11px] text-red-500">
                      {errors.totalComponents &&
                        touched.totalComponents &&
                        errors.totalComponents}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-[500]">
                      Completed Screens
                    </label>
                    <input
                      className="bg-gray-200 outline-none p-1 py-0.5 rounded-sm"
                      id="completed"
                      type="number"
                    />
                    <p className="text-[11px] text-red-500">
                      {errors.completed &&
                        touched.completed &&
                        errors.completed}
                    </p>
                  </div>
                </div>
                <button type="submit" id="sub" className="bg-gray-200 p-1">
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
