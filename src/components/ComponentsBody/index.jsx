import React from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../Slice/Slice";

function ComponentsBody({ item, ind }) {
  const dispatch = useDispatch();

  const updateStatus = (e) => {
    const newStatus = e.target.value;
    dispatch(updateData({ itemId: item._id, newStat: { status: newStatus } }));
  };

  const {
    date,
    name,
    packName,
    totalComponents,
    componentsInProgress,
    componentsCompleted,
    status,
  } = item;

  return (
    <tr className="table-row shadow-[0px_0px_5px_#00000020] text-center">
      <td className="table-cell p-2.5">{ind + 1}</td>
      <td className="table-cell">{date}</td>
      <td className="table-cell">{name}</td>
      <td className="table-cell">{packName}</td>
      <td className="table-cell">{totalComponents}</td>
      <td className="table-cell">{componentsCompleted}</td>
      <td className="table-cell p-2 ">
        <select
          onChange={updateStatus}
          className="outline-none bg-neutral-200 p-1 px-2 rounded-md"
          value={status}
        >
          <option value="Todo">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </td>
    </tr>
  );
}

export default ComponentsBody;
