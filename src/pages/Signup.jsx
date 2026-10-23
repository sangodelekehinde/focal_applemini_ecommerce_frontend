import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import apple_form from "../assets/apple_form_trimmed.png";
import PasswordInput from "../components/PasswordInput";

function Signup() {
  const navigate = useNavigate();

  // 1. The form data the user types
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  // 2. The mutation: "send this data to Django"
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: registerUser, // the function that calls Django
    onSuccess: () => {
      // runs only if Django says OK
      setTimeout(() => navigate("/login"), 4000);
    },
  });

  // 3. Update the form as the user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 4. When the user clicks Sign up
  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from refreshing
    mutate(form); // sends the form to Django
  };

  return (
    <div className="mt-20 flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="wrapper w-[85%] flex flex-col gap-5 md:w-[25%] shadow-md rounded-2xl p-7 "
      >
        <div className="img_logo flex justify-center">
          <img className="size-14 object-contain" src={apple_form} alt="" />
        </div>
        <h2 className="font-bold text-2xl text-center">Create an account</h2>

        <div className="username flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="border border-[grey] p-2 rounded-full pl-5 outline-none"
          />
        </div>

        <div className="email flex flex-col gap-1">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-[grey] p-2 rounded-full pl-5 outline-none"
          />
        </div>

        <div className="password flex flex-col gap-1">
          <label htmlFor="password">Create Password:</label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Shows Django's error message if signup fails */}
        {isError && (
          <p className="text-red-500">
            {Object.values(error).flat().join(" ")}
          </p>
        )}

        {/* Shows after signup succeeds */}
        {isSuccess && (
          <p className="text-green-600">
            Account created successfully! Redirecting to login...
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || isSuccess}
          className="bg-[black] text-white rounded-full p-2 font-semibold disabled:opacity-60"
        >
          {isPending ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
