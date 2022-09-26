import React, { useEffect } from "react";
import Modal from "./modal";

export default function SalaryAutomate({ salaryAuto, setSalaryAuto }) {
  useEffect(() => {
    if (new Date(salaryAuto.salaryDate).getMonth !== new Date().getMonth()) {
      setSalaryAuto({ ...salaryAuto, isDone: false });
    }
  }, []);

  return (
    <Modal
      onHide={() => {
        setSalaryAuto({ ...salaryAuto, showModal: false, isDone: true });
      }}
      confirm={() => {
        setSalaryAuto({ ...salaryAuto, showModal: false, isDone: false });
      }}
    >
      <div>
        <h2 className="font-semibold">Salary Automation</h2>
        <p className="text-sm text-gray-600">
          This will make sure your Budgetter account will add your salary
          automatically!
        </p>
      </div>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative space-y-2">
          <div className="flex flex-col gap-2">
            <p>How much is your salary?</p>
            <input
              type="number"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Salary amount"
              value={salaryAuto.salary}
              onChange={(e) =>
                setSalaryAuto({ ...salaryAuto, salary: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>When do you get your salary?</p>
            <input
              type="datetime-local"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Salary credit date"
              value={salaryAuto.salaryDate}
              onChange={(e) =>
                setSalaryAuto({ ...salaryAuto, salaryDate: e.target.value })
              }
              required
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
