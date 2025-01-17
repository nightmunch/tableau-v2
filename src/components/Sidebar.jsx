import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../contexts/ContextProvider";
import { listDashboards } from "./data/dashboards";
import { tab } from "@syncfusion/ej2-react-grids";

const Sidebar = ({
  option,
  checkBoxes,
  setCheckBoxes,
  dashboards,
  setDashboards,
}) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            ></Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/* SIDE BAR CONTENT */}
          <div className="flex flex-col mt-10 gap-2">
            <h1 className="font-bold text-xl border-2 border-black w-60 pl-2 mr-4">
              Charts
            </h1>

            {listDashboards
              .find((dashboard) => dashboard.option === option)
              .tableau.map((tableauDashboard) => (
                <div className="flex gap-2" key={tableauDashboard.title}>
                  <label htmlFor="">{tableauDashboard.title}</label>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={checkBoxes.includes(tableauDashboard.title)}
                    value={tableauDashboard.title}
                    onChange={(e) => {
                      if (checkBoxes.includes(tableauDashboard.title)) {
                        setCheckBoxes([
                          ...checkBoxes.filter(
                            (checkbox) => checkbox !== tableauDashboard.title
                          ),
                        ]);
                        setDashboards(
                          listDashboards
                            .find((dashboards) => dashboards.option === option)
                            .tableau.filter((dash) =>
                              [
                                ...checkBoxes.filter(
                                  (checkbox) =>
                                    checkbox !== tableauDashboard.title
                                ),
                              ].includes(dash.title)
                            )
                        );
                      } else {
                        setCheckBoxes([...checkBoxes, tableauDashboard.title]);
                        setDashboards(
                          listDashboards
                            .find((dashboards) => dashboards.option === option)
                            .tableau.filter((dash) =>
                              [...checkBoxes, tableauDashboard.title].includes(
                                dash.title
                              )
                            )
                        );
                      }
                    }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
