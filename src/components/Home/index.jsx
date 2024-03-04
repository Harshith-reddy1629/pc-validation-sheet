import React, { useEffect, useMemo, useState } from "react";

// import dummy from "../dummy.json";

import user from "../users.json";

import Taskitem from "../Taskitem";

import axios from "axios";

import { TailSpin } from "react-loader-spinner";

import Add from "../Add";

import { CSVDownload, CSVLink } from "react-csv";

import { useDispatch, useSelector } from "react-redux";

import { fetchData, updateData } from "../Slice/Slice";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { IoClose } from "react-icons/io5";

import { useSearchParams } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Cookies from "js-cookie";

import "./index.css";

function Home() {
  const dataSelected = useSelector((state) => state.data);

  const [filters, setFilters] = useSearchParams();

  console.log("a", dataSelected.data);

  const dispatch = useDispatch();

  const token = Cookies.get("jwt_token");

  const decoded = jwtDecode(token);

  const date = filters.get("date") ?? "";

  const nameF = filters.get("nameF") ?? "";

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const tos = () => {
    {
      dataSelected.modifyStatus === "Updating" &&
        toast.info(dataSelected.modifyStatus);
    }
    {
      dataSelected.modifyStatus === "Success" &&
        toast.success(dataSelected.modifyStatus);
    }
    {
      dataSelected.modifyStatus === "Adding" &&
        toast.info(dataSelected.modifyStatus);
    }
    {
      dataSelected.modifyStatus === "Error" &&
        toast.error(dataSelected.modifyStatus);
    }
  };

  const filteredData = useMemo(() => {
    if (!date || date === "all") {
      if (!nameF) {
        return dataSelected.data;
      } else {
        return dataSelected.data.filter((item) =>
          item.user_name.toLowerCase().includes(nameF.toLowerCase())
        );
      }
    }

    return dataSelected.data
      .filter((item) => item.date === date)
      .filter((each) =>
        each.user_name.toLowerCase().includes(nameF.toLowerCase())
      );
  }, [dataSelected, filters]);

  const countOfDoneScreens = dataSelected.doneScreens;

  return (
    <div className=" main-container ">
      <div className="">
        <h1 className="text-center text-[24px] font-mono">
          Hi {decoded.username}
        </h1>
      </div>
      <div className="flex justify-between mb-2">
        <Add />
        {/* {toasst()} */}
        <div></div>
        {tos()}
        <ToastContainer />
        <div>
          <p className="p-1 border-2 rounded min-w-40 border-gray-500">
            Done Packs : {countOfDoneScreens}{" "}
          </p>
        </div>
      </div>
      <div className="flex  gap-10 w-full items-end">
        {decoded.is_admin && (
          <div className="flex flex-col gap-x-2 ">
            <label className="text-[12px] font-bold">Filter User</label>
            <input
              list="users"
              name="user"
              id="user"
              defaultValue={nameF}
              onChange={(e) => setFilters({ date, nameF: e.target.value })}
              placeholder="Enter user"
              className="outline-none bg-stone-200 p-1 px-2 rounded placeholder:text-gray-500 text-[15px] shadow-[4px_4px_2px_#00000020_,_-3px_-3px_3px_#fff_,_inset_3px_3px_5px_#00000010] "
            />

            <datalist id="users">
              {user.map((value, index) => (
                <option value={value.name} key={index} />
              ))}
            </datalist>
          </div>
        )}
        <div>
          <label className="text-[12px] font-bold">Filter by date</label>
          <div className="date_container shadow">
            <input
              type="date"
              value={date}
              className="p-1 text-[13px] "
              onChange={(e) => setFilters({ nameF, date: e.target.value })}
            />
            <button
              onClick={() => {
                setFilters({ nameF, date: "" });
              }}
            >
              <IoClose />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full py-3">
        <table className="table w-full border-separate border-spacing-y-3 text-center">
          <thead className="table-header-group  bg-slate-300  ">
            <tr className="table-row  ">
              <th className="table-cell p-2 rounded-l-md">S no</th>
              <th className="table-cell">Date</th>
              {decoded.is_admin && <th className="table-cell">Editor Name </th>}
              <th className="table-cell">component Name</th>
              <th className="table-cell">Screens</th>
              <th className="table-cell">Completed</th>
              <th className="table-cell">Status</th>
              <th className="table-cell"></th>
            </tr>
          </thead>
          {dataSelected.status === "Success" && (
            <tbody className="table-row-group">
              {filteredData.map((e, ind) => (
                <Taskitem e={e} ind={ind} key={e._id} />
              ))}
            </tbody>
          )}
        </table>
        {dataSelected.status === "Loading" && (
          <div className="w-[100%] flex justify-center  h-[200px] items-center">
            <TailSpin height={40} />
          </div>
        )}
        {dataSelected.status === "initial" && (
          <div className="w-[100%] flex justify-center h-[200px] items-center">
            <TailSpin height={40} />
          </div>
        )}
      </div>

      <CSVLink
        className="sticky bottom-3 float-end bg-green-700 p-1 px-3 rounded text-[13px] font-bold shadow-[3px_4px_8px_#00000050] text-white right-0 "
        data={dataSelected.data.map((each, ind) => ({
          ["S no"]: ind + 1,
          Name: each.user_name,
          ["Total screens"]: each.template_data.No_of_screens_completed,
          Completed: each.completed_today,
          Status: each.template_data.status,
          Date: each.date,
        }))}
      >
        Download in csv
      </CSVLink>
    </div>
  );
}

export default Home;
