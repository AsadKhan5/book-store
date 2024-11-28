import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const TableWrapper = ({ data, action, searchText, onSearch }) => {
  const [selectedCol, setSelectedCol] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      const _options = columns.map((value) => ({ label: value, value }));
      setOptions(_options);
      setSelectedCol(_options.slice(0, 6)); // Default columns
    } else {
      setOptions([]);
      setSelectedCol([]);
    }
  }, [data]);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col lg:flex-row gap-5 justify-between lg:items-baseline items-end">
        <MultiSelect
          options={options}
          value={selectedCol}
          onChange={setSelectedCol}
          labelledBy="Table Columns"
          className="lg:w-1/2 w-full bg-base-100"
        />
        <div className="flex gap-5 w-full lg:max-w-xl justify-end items-end">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              placeholder="Search within any column"
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
            />
            <IoSearchOutline className="h-4 w-4 opacity-70" />
          </label>
          <div className="flex gap-5 lg:w-44">
            <button
              className="btn btn-primary text-white shadow-xl shadow-primary/50 hover:shadow-sm"
              onClick={handleExport}
            >
              Export to Excel
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <table className="table table-xs table-zebra">
          <thead>
            <tr>
              {action && <th>Action</th>}
              {selectedCol?.map((col) => (
                <th key={col.value} className="capitalize">
                  {col.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.id}>
                {action && (
                  <td>
                    {action.map((act, index) => (
                      <button
                        key={index}
                        className="btn btn-xs"
                        data-tip={act.dataTip}
                        onClick={() =>
                          navigate(
                            `/${act.navigate.link}/${encodeURIComponent(
                              row[act.navigate.variable[0]]
                            )}`
                          )
                        }
                      >
                        {act.icon}
                      </button>
                    ))}
                  </td>
                )}
                {selectedCol?.map((col) => (
                  <td key={col.value}>{row[col.value] ?? ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWrapper;
