import { useEffect, useState } from "react";
import uuid from "react-uuid";
import formatRelative from "date-fns/formatRelative";
import { useLocalStorage, internationalizeCurrency } from "./hooks";
import { addDays } from "date-fns";
import Modal from "./components/modal";
import { LineChart, Line, XAxis, YAxis, BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SalaryAutomate from "./components/SalaryAutomate";
import SalaryDivider from "./components/SalaryDivider";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [balanceValue, setBalanceValue] = useState("");
  const [balance, setBalance] = useLocalStorage("balance", 0);
  const [modalBalanceValue, setModalBalanceValue] = useState(balance);
  const [viewAllExpense, setViewAllExpense] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [salaryAuto, setSalaryAuto] = useLocalStorage("salaryAuto", {
    salary: "",
    salaryDate: "",
    showModal: false,
    isDone: false,
  });

  const [showSalaryDivider, setShowSalaryDivider] = useState(false);

  const [expenseCategories, setExpenseCategories] = useState([
    {
      id: 1,
      name: "Transportation",
      icon: "/icons/bus-outline.svg",
    },
    {
      id: 2,
      name: "Food",
      icon: "/icons/fast-food-outline.svg",
    },
    {
      id: 3,
      name: "Fun",
      icon: "/icons/happy-outline.svg",
    },
    {
      id: 4,
      name: "Gadgets",
      icon: "/icons/phone-portrait-outline.svg",
    },
    {
      id: 5,
      name: "Clothing",
      icon: "/icons/shirt-outline.svg",
    },
    {
      id: 6,
      name: "Misc",
      icon: "/icons/layers-outline.svg",
    },
  ]);

  const [categoryId, setCategoryId] = useState("Transportation");

  const [currentExpense, setCurrentExpense] = useState({
    id: uuid(),
    title: "",
    amount: "",
    category: "",
    date: Date.now(),
  });

  const handleAddBalance = (e) => {
    e.preventDefault();
    setBalance((prev) => +balanceValue + prev);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    const expense = {
      ...currentExpense,
      category: expenseCategories.filter((category) => category.name === categoryId),
    };

    setExpenses((prev) => [...prev, expense]);
    setBalance((prev) => prev - parseInt(currentExpense.amount));

    setCurrentExpense({
      id: uuid(),
      title: "",
      amount: "",
      category: "",
      date: Date.now(),
    });
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    setBalance((prev) => prev + parseInt(expenses.filter((expense) => expense.id == id)[0].amount));
  };

  useEffect(() => {
    if (new Date(salaryAuto.salaryDate).getTime() < new Date().getTime() && salaryAuto.isDone === false) {
      console.log("Salary Credited!", salaryAuto);
      setBalance((prev) => +prev + parseInt(salaryAuto.salary));
      setSalaryAuto({ ...salaryAuto, isDone: true });
    }
  }, [salaryAuto.salary, salaryAuto.salaryDate, salaryAuto.isDone]);

  useEffect(() => {
    const months = {
      January: expenses.filter((expense) => new Date(expense.date).getMonth() === 0),
      February: expenses.filter((expense) => new Date(expense.date).getMonth() === 1),
      March: expenses.filter((expense) => new Date(expense.date).getMonth() === 2),
      April: expenses.filter((expense) => new Date(expense.date).getMonth() === 3),
      May: expenses.filter((expense) => new Date(expense.date).getMonth() === 4),
      June: expenses.filter((expense) => new Date(expense.date).getMonth() === 5),
      July: expenses.filter((expense) => new Date(expense.date).getMonth() === 6),
      August: expenses.filter((expense) => new Date(expense.date).getMonth() === 7),
      September: expenses.filter((expense) => new Date(expense.date).getMonth() === 8),
      October: expenses.filter((expense) => new Date(expense.date).getMonth() === 9),
      November: expenses.filter((expense) => new Date(expense.date).getMonth() === 10),
      December: expenses.filter((expense) => new Date(expense.date).getMonth() === 11),
    };
  }, []);

  return (
    <div className=" mx-auto  p-2  space-y-2 bg-[#1f2937]">
      {/* Balance Change Modal */}

      {showModal && (
        <Modal onHide={() => setShowModal(false)} confirm={() => setShowModal(false)}>
          <h2>You Current Balance</h2>
          <div>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-white">₹</div>
              <input
                type="number"
                id="default-search"
                className="block p-4 pl-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter you current balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Salary Automate */}
      {salaryAuto.showModal && <SalaryAutomate salaryAuto={salaryAuto} setSalaryAuto={setSalaryAuto} />}

      {showSalaryDivider && <SalaryDivider setShowModal={setShowSalaryDivider} />}

      <p className="text-2xl text-white text-center my-5">Budgetter</p>

      {/* Balance Add Form */}
      <form onSubmit={handleAddBalance}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <input
            type="number"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter you current balance"
            value={balanceValue}
            onChange={(e) => setBalanceValue(e.target.value)}
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

      <div className="w-full h-full bg-gray-700 rounded-md text-white p-3 flex flex-col gap-3">
        {/* Current Balance Viewer */}
        <div className="flex items-center">
          <p className=" text-2xl flex items-center gap-2 flex-wrap">
            You Current Balance is:{" "}
            <span className={`${balance < 0 ? "text-red-500 font-semibold" : "text-white"}`}>{internationalizeCurrency(balance)} </span>
            <button
              className=" ml-2 py-1 px-2 shadow-md no-underline rounded-full bg-green-500 hover:bg-green-600 text-white font-sans font-semibold  text-xs border-green-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none"
              onClick={() => setShowModal(true)}
            >
              Change *
            </button>
          </p>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
            Search
          </label>
          <div className="relative flex flex-col sm:flex-row gap-2">
            <div className=" hidden sm:flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <select
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {expenseCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What's you recent expense?"
              value={currentExpense.title}
              onChange={(e) => setCurrentExpense({ ...currentExpense, title: e.target.value })}
              required
            />
            <input
              type="number"
              className="block p-4  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="How much did you spend?"
              value={currentExpense.amount}
              onChange={(e) => setCurrentExpense({ ...currentExpense, amount: e.target.value })}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            >
              Deduct
            </button>
          </div>
        </form>

        {/* Toolbar */}

        <div className="w-full  flex items-center justify-center sm:justify-start flex-wrap gap-2 ">
          <button
            className=" py-1 px-2 shadow-md no-underline rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold  text-xs border-emerald-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 "
            onClick={() => setShowSalaryDivider(true)}
          >
            Salary Divider
          </button>
          <button className=" py-1 px-2 shadow-md no-underline rounded-full bg-purple-500 hover:bg-purple-600 text-white font-sans font-semibold  text-xs border-purple-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 ">
            Price Calculator
          </button>
          <button className=" py-1 px-2 shadow-md no-underline rounded-full bg-sky-500 hover:bg-sky-600 text-white font-sans font-semibold  text-xs border-sky-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 ">
            EMI Calculator
          </button>
          <button className=" py-1 px-2 shadow-md no-underline rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-sans font-semibold  text-xs border-indigo-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 ">
            Tip Calculator
          </button>
          <button className=" py-1 px-2 shadow-md no-underline rounded-full bg-pink-500 hover:bg-pink-600 text-white font-sans font-semibold  text-xs border-pink-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 ">
            Udhaar Book
          </button>
          <button
            className=" py-1 px-2 shadow-md no-underline rounded-full bg-amber-500 hover:bg-amber-600 text-white font-sans font-semibold  text-xs border-amber-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 "
            disabled
          >
            Salary Automate
          </button>
          <button
            className=" py-1 px-2 shadow-md no-underline rounded-full bg-teal-500 hover:bg-teal-600 text-white font-sans font-semibold  text-xs border-teal-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none disabled:opacity-50 "
            disabled
          >
            Auto Expense
          </button>
        </div>

        {/* Expense List */}
        {expenses.length > 0 && (
          <div className="p-4  bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Expenses</h3>
              <button
                onClick={() => setViewAllExpense((prev) => !prev)}
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                {viewAllExpense ? "Show less" : "View all"}
              </button>
            </div>
            <div className="flow-root">
              <p className=" text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
                Today you spend:{" "}
                <span className="text-red-500">
                  -
                  {internationalizeCurrency(
                    expenses
                      .filter((expense) => new Date(expense.date).getDate() === new Date().getDate())
                      .reduce(function (previousValue, currentValue) {
                        return +previousValue + parseInt(currentValue.amount);
                      }, 0)
                  )}{" "}
                </span>
              </p>
              <p className=" text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
                Yesterday you spend:{" "}
                <span className="text-red-500">
                  -
                  {internationalizeCurrency(
                    expenses
                      .filter((expense) => new Date(expense.date).getDate() === new Date().getDate() - 1)
                      .reduce(function (previousValue, currentValue) {
                        return +previousValue + parseInt(currentValue.amount);
                      }, 0)
                  )}{" "}
                </span>
              </p>
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {expenses
                  .sort((a, b) => b.date - a.date)
                  .slice(0, viewAllExpense ? expenses.length : 5)
                  .map((expense) => {
                    return (
                      <li className="py-3 sm:py-4" key={uuid()}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center rounded-full bg-gray-400 text-white  w-10 h-10 font-bold ">
                              {expense?.category
                                ? // <img
                                  //   src={expense.category[0].icon}
                                  //   alt={expense.value}
                                  //   className="w-5 h-5"
                                  // />
                                  expense.category[0].name[0]
                                : expense.title[0]}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{expense.title}</p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {formatRelative(addDays(expense.date, 0), new Date())}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {internationalizeCurrency(expense.amount)}{" "}
                            <button
                              className=" ml-2  scale-[0.8] py-1 px-2 shadow-md no-underline rounded-full bg-red-500 text-white font-sans font-semibold  text-xs border-red-500 btn-primary hover:text-white hover:bg-red-500-light focus:outline-none active:shadow-none"
                              onClick={() => handleRemoveExpense(expense.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Charts */}
      <div className="w-full  bg-gray-700 rounded-md text-white p-3 flex flex-col items-center justify-center gap-3 ">
        <h2 className="text-2xl font-bold">Today's Expense Chart</h2>
        <LineChart
          width={500}
          height={400}
          className=" scale-50 sm:scale-100"
          data={expenses
            .filter((expense) => new Date(expense.date).getDate() === new Date().getDate())
            .map((expense) => {
              return {
                name: expense.title,
                uv: 400,
                pv: parseInt(balance),
                amt: parseInt(expense.amount),
              };
            })
            .reverse()}
        >
          <Line type="monotone" dataKey="amt" stroke="rgb(239, 68, 68)" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amt" />
        </LineChart>
      </div>

      {/* Summary */}
      <div className="w-full h-full  bg-gray-700 rounded-md text-white p-3 flex flex-col justify-center gap-3 ">
        <h2 className="text-2xl font-bold text-center">You expense history & summary</h2>
        <div className="p-3 w-full h-full flex flex-col gap-2  items-center justify-center">
          {/* Today */}
          <p className=" p-1 rounded-full text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
            Today you spend:{" "}
            <span className="text-red-500">
              -
              {internationalizeCurrency(
                expenses
                  .filter((expense) => new Date(expense.date).getDate() === new Date().getDate())
                  .reduce(function (previousValue, currentValue) {
                    return +previousValue + parseInt(currentValue.amount);
                  }, 0)
              )}{" "}
            </span>
          </p>
          {/* Yesterday */}
          <p className=" p-1 rounded-full text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
            Yesterday you spend:{" "}
            <span className="text-red-500">
              -
              {internationalizeCurrency(
                expenses
                  .filter((expense) => new Date(expense.date).getDate() === new Date().getDate() - 1)
                  .reduce(function (previousValue, currentValue) {
                    return +previousValue + parseInt(currentValue.amount);
                  }, 0)
              )}{" "}
            </span>
          </p>
          {/* Week */}
          <p className=" p-1 rounded-full text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
            This month you spend:{" "}
            <span className="text-red-500">
              -
              {internationalizeCurrency(
                expenses
                  .filter((expense) => new Date(expense.date).getMonth() === new Date().getMonth())
                  .reduce(function (previousValue, currentValue) {
                    return +previousValue + parseInt(currentValue.amount);
                  }, 0)
              )}{" "}
            </span>
          </p>
          {/* Last Week */}
          <p className=" p-1 rounded-full text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
            Last month you spend:{" "}
            <span className="text-red-500">
              -
              {internationalizeCurrency(
                expenses
                  .filter((expense) => new Date(expense.date).getMonth() === new Date().getMonth() - 1)
                  .reduce(function (previousValue, currentValue) {
                    return +previousValue + parseInt(currentValue.amount);
                  }, 0)
              )}{" "}
            </span>
          </p>
          {/* Year */}
          <p className=" p-1 rounded-full text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
            This year you spend:{" "}
            <span className="text-red-500">
              -
              {internationalizeCurrency(
                expenses
                  .filter((expense) => new Date(expense.date).getFullYear() === new Date().getFullYear())
                  .reduce(function (previousValue, currentValue) {
                    return +previousValue + parseInt(currentValue.amount);
                  }, 0)
              )}{" "}
            </span>
          </p>

          <hr className=" border-2 bg-transparent border-gray-500 w-full my-3" />

          {/* Average */}
          <p className=" p-1 rounded-full text-md flex items-center gap-2 flex-wrap text-gray-800 dark:text-white">
            Everyday Average you spend:
            <span className="text-red-500">
              -
              {internationalizeCurrency(
                expenses.reduce(function (previousValue, currentValue, i) {
                  return Math.round((parseInt(previousValue.amount) + parseInt(currentValue.amount)) / parseInt(previousValue.amount.length));
                }, 0)
              )}{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
