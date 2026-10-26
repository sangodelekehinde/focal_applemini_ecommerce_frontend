import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import apple_form from "../assets/apple_form_trimmed.png";
import { useLocation } from "react-router-dom"; // add useLocation
import PasswordInput from "../components/PasswordInput";
import { FaArrowLeft } from "react-icons/fa6";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // where RequireAuth sent them from

  const [form, setForm] = useState({ username: "", password: "" });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate(from, { replace: true });
    },
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="wrapper ">
      <button className="bg-[#151ec7] p-3 rounded-xl mt-7 ml-9 md:hidden hover:bg-black">
        <FaArrowLeft onClick={() => navigate("/")} className="text-[white] text-lg" />
      </button>
      <div className="mt-20 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="wrapper w-[85%] flex flex-col gap-5 md:w-[25%] shadow-md rounded-2xl p-7 "
        >
          <div className="img_logo flex justify-center">
            <img className="size-14 object-contain" src={apple_form} alt="" />
          </div>
          <h2 className="font-bold text-2xl md:text-center">Login</h2>

          <div className="username flex flex-col gap-1">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="username"
              required
              className="border border-[grey] p-2 rounded-full pl-5 outline-none"
            />
          </div>

          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            placeholder="password"
            onChange={handleChange}
          />

     
          {mutation.isError && (
            <p className="text-red-500">
              {mutation.error.detail || "Login failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[black] text-white rounded-full p-2 font-semibold disabled:opacity-60"
          >
            {mutation.isPending ? "Logging in..." : "Log In"}
          </button>

          <div className="flex gap-1 text-[#000000ce]">
            <p>Don't have an account?</p>
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer"
            >
              Create account
            </span>
          </div>
          <p
            onClick={() => navigate("/forgot-password")}
            className="underline cursor-pointer text-[#000000ce]"
          >
            Forgot your password?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
