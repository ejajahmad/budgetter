import React from "react";

export default function Modal({ onHide, confirm, heading, children }) {
  return (
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div class="bg-white px-16 py-14 rounded-md text-center flex flex-col gap-5">
        {heading && <h1 class="text-xl mb-4 font-bold text-slate-500">{heading}</h1>}
        {children}
        <div>
          <button class="bg-red-500 px-4 py-2 rounded-md text-md text-white" onClick={onHide}>
            Cancle
          </button>
          <button
            class="bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            onClick={() => {
              confirm();
              onHide();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
