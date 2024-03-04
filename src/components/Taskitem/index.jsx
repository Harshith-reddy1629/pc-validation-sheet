import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../Slice/Slice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { HiDotsVertical } from "react-icons/hi";
import PackDetails from "../packDetails";

function Taskitem({ e, ind }) {
  const token = Cookies.get("jwt_token");

  const decoded = jwtDecode(token);
  const dispatch = useDispatch();

  const updateStatus = (event) => {
    const newStatus = event.target.value;
    dispatch(
      updateData({
        Ids: {
          itemID: e._id,
          userId: e.user_id,
          templateId: e.template_id,
        },
        stat: { newValue: 3, newStat: newStatus },
      })
    );
  };

  // const { status, No_of_screens_completed } = template_data;

  return (
    <tr className="table-row  ">
      <td className="table-cell p-2 rounded-l-md">{ind + 1}</td>
      <td className="table-cell">{e.date}</td>
      {decoded.is_admin && <td className="table-cell">{e.user_name} </td>}
      <td className="table-cell">{e.template_name}</td>
      <td className="table-cell">{e.template_data.No_of_screens_completed}</td>
      <td className="table-cell">{e.completed_today}</td>
      <td className="table-cell">
        <select
          className="bg-gray-300 p-1 shadow-[0px_0px_2px_#00000030] rounded"
          value={e.template_data.status}
          onChange={updateStatus}
        >
          <option value="Todo">Todo</option>
          <option value="In_progress">In_progress</option>
          <option value="Done">Done</option>
        </select>
      </td>
      <td className="table-cell">
        <PackDetails i={e} />
        {/* <HiDotsVertical /> */}
      </td>
    </tr>
  );
}

export default memo(Taskitem);
