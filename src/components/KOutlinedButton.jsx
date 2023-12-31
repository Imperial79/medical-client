import React from "react";

function KOutlinedButton({ label, onClick, isActive }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={` ${
          isActive
            ? "bg-blue-500 text-white border border-blue-500 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            : "text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        }`}
      >
        {label}
      </button>
    </>
  );
}

export default KOutlinedButton;
