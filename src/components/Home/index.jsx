import React, { useEffect, useMemo, useState } from "react";

import dummy from "../dummy.json";
import user from "../users.json";
import ComponentsBody from "../ComponentsBody";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Add from "../Add";
import { CSVDownload, CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, fetchData, updateData } from "../Slice/Slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoClose } from "react-icons/io5";

import { useSearchParams } from "react-router-dom";
// import  from "../Slice/Slice";

function Home() {
  const dataSelected = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [filters, setFilters] = useSearchParams();
  // const date = filters.get("date");
  // console.log(filters.get("date"));
  const date = filters.get("date") ?? "";
  const nameF = filters.get("nameF") ?? "";
  const onSearch = () => {
    clearTimeout(searchInt);

    let searchInt = setTimeout(() => {}, 1000);
  };

  const filteredData = useMemo(() => {
    if (!date || date === "all") {
      if (!nameF) {
        return dataSelected.data;
      } else {
        return dataSelected.data.filter((item) =>
          item.name.toLowerCase().includes(nameF.toLowerCase())
        );
      }
    }

    return dataSelected.data
      .filter((item) => item.date === date)
      .filter((each) => each.name.toLowerCase().includes(nameF.toLowerCase()));
  }, [dataSelected, filters]);

  useEffect(() => {
    console.log("first");
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

  const countOfDoneScreens = useMemo(() => {
    return dataSelected.data.filter((item) => item.status === "Done").length;
  }, [dataSelected.data]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <Add />
        {/* {toasst()} */}
        <div>
          <div className="flex gap-x-2 items-center">
            <label>Filter User</label>
            <input
              list="users"
              name="user"
              id="user"
              defaultValue={nameF}
              onChange={(e) => setFilters({ date, nameF: e.target.value })}
              placeholder="Enter user"
              className="outline-none bg-stone-200 p-1 px-2 rounded placeholder:text-gray-500 text-[15px]"
            />

            <datalist id="users">
              {user.map((value, index) => (
                <option value={value.name} key={index} />
              ))}
            </datalist>
          </div>
        </div>
        {tos()}
        <ToastContainer />
        <div>
          <p>Done Screens : {countOfDoneScreens} </p>
        </div>
      </div>
      <div>
        <div className="flex items-center w-fit  bg-slate-300 gap-1 pr-1">
          <input
            type="date"
            value={date}
            className="p-1 text-[14px]"
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
      <div className="w-full py-3">
        <table className="table w-full border-separate border-spacing-3 ">
          <thead className="table-header-group">
            <tr className="table-row">
              <th className="table-cell">S no</th>
              <th className="table-cell">Date</th>
              <th className="table-cell">Editor Name </th>
              <th className="table-cell">component Name</th>
              <th className="table-cell">Screens</th>
              <th className="table-cell">Completed</th>
              <th className="table-cell">Status</th>
            </tr>
          </thead>
          {dataSelected.status === "Success" && (
            <tbody className="table-row-group">
              {filteredData.map((each, index) => (
                <ComponentsBody item={each} ind={index} key={index} />
              ))}

              {/* <tr className="table-row">
              <td></td>
            </tr> */}
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
        data={filteredData.map((each) => ({
          Name: each.name,
          ["Total screens"]: each.totalComponents,
          Completed: each.componentsCompleted,
          Status: each.status,
          Date: each.date,
        }))}

        //     date,
        // name,
        // packName,
        // totalComponents,
        // componentsInProgress,
        // componentsCompleted,
        // status,
      >
        Download in CSV
      </CSVLink>
    </div>
  );
}

export default Home;
