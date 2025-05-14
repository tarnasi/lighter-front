"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/apollo/queries";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

const LoginForm = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>(
    {}
  );
  
  const setUser = useUserStore((state) => state.setUser)

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

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
      const token = res?.data?.login?.token;
      const user = res?.data?.login?.user;

      if (token) {
        Cookies.set("accessToken", token, {
          expires: 7,
          // secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        Cookies.set("me", JSON.stringify(user), {
          expires: 7,
          sameSite: "Lax",
        });
        setUser(user)
        window.location.href = "/panel";
      } else {
        setErrors({ password: "توکن دریافتی نامعتبر بود." });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err?.graphQLErrors?.length) {
        setErrors({ password: err.graphQLErrors[0].message });
      } else {
        setErrors({ password: "خطا در ورود. دوباره تلاش کنید." });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`h-full w-full md:w-1/2 lg:w-1/3 mt-8 p-4 rounded shadow-xl transition-opacity ${
        loading ? "opacity-60 pointer-events-none" : ""
      }`}
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
          disabled={loading}
          className={`border border-gray-500 p-2 rounded ${
            loading ? "bg-gray-100 text-gray-400" : ""
          }`}
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
          disabled={loading}
          className={`border border-gray-500 p-2 rounded ${
            loading ? "bg-gray-100 text-gray-400" : ""
          }`}
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
          className={`py-2 px-8 text-white flex justify-center items-center gap-2 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>در حال ورود...</span>
            </>
          ) : (
            "ورود"
          )}
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
