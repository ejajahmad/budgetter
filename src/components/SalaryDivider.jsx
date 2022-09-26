import React, { useEffect, useState } from "react";
import { internationalizeCurrency } from "../hooks";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Modal from "./modal";

export default function SalaryDivider({ setShowModal }) {
  const [salary, setSalary] = useState("");
  const [salaryData, setSalaryData] = useState({
    needs: "",
    wants: "",
    savings: "",
  });

  const handleSalaryDivide = (e) => {
    e.preventDefault();
    setSalaryData({
      needs: (50 / 100) * parseInt(salary),
      wants: (30 / 100) * parseInt(salary),
      savings: (20 / 100) * parseInt(salary),
    });

    console.log(salary, {
      needs: (50 / 100) * parseInt(salary),
      wants: (30 / 100) * parseInt(salary),
      savings: (20 / 100) * parseInt(salary),
    });
  };

  return (
    <Modal
      onHide={() => setShowModal(false)}
      confirm={() => setShowModal(false)}
    >
      <div>
        <h2 className="font-semibold">Salary Divider</h2>
        <p className="text-sm text-gray-600">
          U.S. Sen. Elizabeth Warren popularized the 50/20/30 budget rule in her
          book, All Your Worth: The Ultimate Lifetime Money Plan. The rule is to
          split your after-tax income into three categories of spending: 50% on
          needs, 30% on wants, and 20% on savings.
        </p>
      </div>

      <form onSubmit={handleSalaryDivide}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="number"
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </form>

      {salaryData.needs && salaryData.wants && salaryData.savings && (
        <div className="flex flex-col sm:flex-row items-center justify-center ">
          <PieChart className=" scale-50 sm:scale-100" width={400} height={400}>
            <Pie
              dataKey="value"
              // isAnimationActive={false}
              data={[
                { name: "needs", value: salaryData.needs },
                { name: "wants", value: salaryData.wants },
                { name: "savings", value: salaryData.savings },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            {/* <Pie
              dataKey="value"
              data={data02}
              cx={500}
              cy={200}
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
            /> */}
            <Tooltip />
          </PieChart>
          <div className="w-full flex flex-col gap-2 items-start justify-center text-left">
            <div className="w-full bg-slate-800 text-white p-3  ">
              <h2 className="font-semibold">Needs</h2>
              <h3>{internationalizeCurrency(salaryData.needs)}</h3>
              <p className="text-sm text-gray-400">
                These include rent or mortgage payments, car payments,
                groceries, insurance, health care, minimum debt payment, and
                utilities.
              </p>
            </div>
            <div className="w-full bg-slate-800 text-white p-3  ">
              <h2 className="font-semibold">Wants</h2>
              <h3>{internationalizeCurrency(salaryData.wants)}</h3>
              <p className="text-sm text-gray-400">
                This includes dinner and movies out, that new handbag, tickets
                to sporting events, vacations, the latest electronic gadget, and
                ultra-high-speed Internet.
              </p>
            </div>
            <div className="w-full bg-slate-800 text-white p-3  ">
              <h2 className="font-semibold">Savings</h2>
              <h3>{internationalizeCurrency(salaryData.savings)}</h3>
              <p className="text-sm text-gray-400">
                This includes adding money to an emergency fund in a bank
                savings account, making IRA contributions to a mutual fund
                account, and investing in the stock market.
              </p>
            </div>
          </div>
        </div>

        // <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 items-center justify-items-center">
        //   <div>
        //     <h2>Needs</h2>
        //     <h3>{internationalizeCurrency(salaryData.needs)}</h3>
        //   </div>
        //   <div>
        //     <h2>Wants</h2>
        //     <h3>{internationalizeCurrency(salaryData.wants)}</h3>
        //   </div>
        //   <div>
        //     <h2>Savings</h2>
        //     <h3>{internationalizeCurrency(salaryData.savings)}</h3>
        //   </div>
        // </div>
      )}
    </Modal>
  );
}
