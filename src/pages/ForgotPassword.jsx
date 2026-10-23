// Reset password page: username + email + new password (no email sent).

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
import PasswordInput from "../components/PasswordInput";
import apple_form from "../assets/apple_form_trimmed.png";

function ForgotPassword() {
  const navigate = useNavigate();

  // what the user types
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [mismatch, setMismatch] = useState(false);

  // updates the right field as the user types (uses the input's "name")
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => setTimeout(() => navigate("/login"), 3000), // go to login after 3 seconds
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from refreshing

    // the two password boxes must match
    if (form.password !== form.confirm) {
      setMismatch(true);
      return;
    }

    setMismatch(false);
    mutation.mutate({
      username: form.username,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className="mt-20 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="wrapper w-[85%] flex flex-col gap-5 md:w-[25%] shadow-md rounded-2xl p-7"
      >
        <div className="img_logo flex justify-center">
          <img className="size-14 object-contain" src={apple_form} alt="" />
        </div>
        <h2 className="font-bold text-2xl md:text-center">Reset password</h2>
        <p className="text-[13px] text-[#000000ce]">
          Enter your username and the email you signed up with, then choose a new password.
        </p>

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
          <label htmlFor="password">New Password:</label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirm">Confirm Password:</label>
          <PasswordInput
            id="confirm"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
          />
        </div>

        {mismatch && <p className="text-red-500">The two passwords don't match.</p>}

        {mutation.isError && (
          <p className="text-red-500">
            {mutation.error.detail || "Something went wrong. Please try again."}
          </p>
        )}

        {mutation.isSuccess && (
          <p className="text-green-600">Password changed! Redirecting to login...</p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending || mutation.isSuccess}
          className="bg-[black] text-white rounded-full p-2 font-semibold disabled:opacity-60"
        >
          {mutation.isPending ? "Saving..." : "Reset password"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="underline cursor-pointer text-[#000000ce]"
        >
          Back to login
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;