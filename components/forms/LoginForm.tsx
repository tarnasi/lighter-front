"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/apollo/queries";

const LoginForm = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>(
    {}
  );

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!mobile) newErrors.mobile = "شماره موبایل الزامی است.";
    else if (!/^09\d{9}$/.test(mobile))
      newErrors.mobile = "شماره موبایل نامعتبر است.";

    if (!password) newErrors.password = "رمز عبور الزامی است.";
    else if (password.length < 6)
      newErrors.password = "رمز عبور حداقل باید ۶ حرف باشد.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await login({ variables: { mobile, password } });
      console.log("Login successful:", res.data);
      // redirect, toast, etc.
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-100 md:w-1/2 lg:w-1/3 mt-8 p-4 rounded shadow-xl"
    >
      <Link
        href="/"
        className="flex justify-center items-center gap-2 border-b border-gray-200 pb-2"
      >
        <Image src="/logo/logo-3.png" alt="tinyfire" width={72} height={72} />
      </Link>

      <div className="flex flex-col my-6">
        <label htmlFor="mobile" className="mb-2">
          شماره موبایل
        </label>
        <input
          className="border border-gray-500 p-2 rounded"
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="09990101010"
          autoComplete="tel"
        />
        {errors.mobile && (
          <span className="text-red-500 text-sm mt-1">{errors.mobile}</span>
        )}
      </div>

      <div className="flex flex-col my-2">
        <label htmlFor="password" className="mb-2">
          پسورد
        </label>
        <input
          className="border border-gray-500 p-2 rounded"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*******"
          autoComplete="current-password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">{errors.password}</span>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-2">
          خطا در ورود: {error.message}
        </p>
      )}

      <div className="flex flex-col mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-8 text-white ${
            loading ? "bg-gray-500" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>

        <p className="text-center mt-4 text-sm">
          <Link
            className="text-sky-600 underline underline-offset-6"
            href="/panel/reset-password"
          >
            فراموشی رمز عبور
          </Link>
        </p>
        <p className="text-center mt-4 text-sm">
          ثبت نام از طریق لینک روبرو{" "}
          <Link
            className="text-sky-600 underline underline-offset-6"
            href="/panel/register"
          >
            اینجا
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
