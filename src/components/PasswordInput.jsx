// A password box with an eye icon to show or hide what you typed.

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function PasswordInput({ id, name, value, onChange, placeholder }) {
  // false = dots (hidden), true = readable text
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full border border-[grey] p-2 rounded-full pl-5 pr-12 outline-none"
      />

      {/* type="button" stops this from submitting the form */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#383838]"
      >
        {show ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}

export default PasswordInput;
