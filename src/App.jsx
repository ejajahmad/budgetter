import { useState } from "react";
import uuid from "react-uuid";
import formatRelative from "date-fns/formatRelative";
import { useLocalStorage, internationalizeCurrency } from "./hooks";
import { addDays } from "date-fns";
import Modal from "./components/modal";

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [balanceValue, setBalanceValue] = useState("");
  const [balance, setBalance] = useLocalStorage("balance", 0);
  const [modalBalanceValue, setModalBalanceValue] = useState(balance);
  const [viewAllExpense, setViewAllExpense] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currentExpense, setCurrentExpense] = useState({
    id: uuid(),
    title: "",
    amount: "",
    date: Date.now(),
  });

  const handleAddBalance = (e) => {
    e.preventDefault();
    setBalance((prev) => +balanceValue + prev);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses((prev) => [...prev, currentExpense]);
    setBalance((prev) => prev - parseInt(currentExpense.amount));
    setCurrentExpense({
      id: uuid(),
      title: "",
      amount: "",
      date: Date.now(),
    });
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <div className=" p-2 h-screen  space-y-2 bg-[#1f2937]">
      {showModal && (
        <Modal onHide={() => setShowModal(false)} confirm={() => setBalance(modalBalanceValue)}>
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
                value={modalBalanceValue}
                onChange={(e) => setModalBalanceValue(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal>
      )}
      <p className="text-2xl text-white text-center my-5">Budgetter</p>
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
          {/* <button
            className=" ml-2 py-1 px-2 shadow-md no-underline rounded-full bg-green-500 text-white font-sans font-semibold  text-xs border-green-500 btn-primary hover:text-white hover:bg-green-500-light focus:outline-none active:shadow-none"
            onClick={() => ""}
          >
            Change *
          </button>
          <button
            className=" ml-2 py-1 px-2 shadow-md no-underline rounded-full bg-lime-500 text-white font-sans font-semibold  text-xs border-lime-500 btn-primary hover:text-white hover:bg-lime-500-light focus:outline-none active:shadow-none"
            onClick={() => ""}
          >
            Add +
          </button> */}
        </div>

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
            <input
              type="text"
              className="block p-4 sm:pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What's you recent expense?"
              value={currentExpense.title}
              onChange={(e) => setCurrentExpense({ ...currentExpense, title: e.target.value })}
              required
            />
            <input
              type="number"
              className="block p-4 sm:pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            {console.log(expenses)}
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {expenses
                  .reverse()
                  .slice(0, viewAllExpense ? expenses.length : 5)
                  .map((expense) => {
                    return (
                      <li className="py-3 sm:py-4" key={uuid()}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center rounded-full bg-gray-400 text-white  w-10 h-10 ">{expense.title[0]}</div>
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
    </div>
  );
}

export default App;
