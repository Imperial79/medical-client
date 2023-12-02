import React, { useContext, useEffect } from "react";
import { Context } from "../Helper/ContextProvider";

function Alert() {
  const { alert, setAlert } = useContext(Context);
  const label = alert["isDanger"] ? "Oops!" : "Success!";
  const content = alert["content"];
  const isDanger = alert["isDanger"];

  if (content !== "") {
    setTimeout(() => {
      setAlert({
        label: "",
        content: "",
        isDanger: false,
      });
    }, 2000);
  }
  return (
    <div
      className={`z-50 fixed top-[100px] md:left-10 w-full ${
        content === "" ? "hidden" : ""
      }`}
    >
      <div
        className={` md:mx-[100px] mx-5 shadow-xl flex items-center p-4 mb-4 text-sm ${
          isDanger ? "bg-red-800" : "bg-green-600"
        } rounded-lg text-white`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only ">Info</span>
        <div>
          <span className="font-medium text-white">{label} </span>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Alert;
