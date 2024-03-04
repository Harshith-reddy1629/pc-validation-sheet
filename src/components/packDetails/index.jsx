import React from "react";
import { HiDotsVertical } from "react-icons/hi";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

function PackDetails({ i }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <button onClick={toggleDrawer}>
        <HiDotsVertical />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="p-2 px-5 !w-[350px] flex flex-col gap-4"
      >
        <div className="">Overview</div>
        <div className="w-full text-left">
          <h1 className="font-bold">Pack Details</h1>
          <h1>Pack Name: {i.template_name}</h1>
          <h1>screens completed: {i.template_data.No_of_screens_completed}</h1>

          <div>
            <ul className="bg-gray-200 mt-2 p-2 rounded ">
              <p className="font-[600]">Editors of this pack</p>
              {i.template_data.users.map((each, index) => (
                <li key={each.user_id}>
                  {index + 1}. {each.user_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full text-left">
          <h1 className="font-bold">Editor Details</h1>

          <h1>User Name: {i.user_name}</h1>
          <h1>
            No_of_screens_completed: {i.user_data.No_of_screens_completed}
          </h1>
          <div>
            <ul className="bg-gray-200 mt-2 p-2 rounded">
              <p className="font-[600]">Edited packs</p>
              {i.user_data.packs.map((each, index) => (
                <li key={each.pack_id}>
                  {index + 1}. {each.pack_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default PackDetails;
