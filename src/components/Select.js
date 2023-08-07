import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../assets/Icons/DownArrow.svg";

const Select = ({ value = "", options = [], onChange, placeholder = "" }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  /* eslint-disable */
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  /* eslint-enable */
  return (
    <div
      className={open ? "select open" : "select"}
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <input
        type="text"
        className="text"
        value={value}
        disabled
        placeholder={placeholder}
      />
      <div className="icon">
        <DownArrow />
      </div>

      <div className="options">
        <div className="details">
          {options.map((option, index) => (
            <div className="text" onClick={() => onChange(option)} key={index}>
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
