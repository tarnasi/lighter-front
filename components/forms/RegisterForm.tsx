"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/apollo/queries";
import JalaliCalendarDate from "./inputs/JalaliCalendarDate";
import Link from "next/link";
import Image from "next/image";

const RegisterForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [birthday, setBirthday] = useState<any>(null);

  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // clear individual error
  };

  const handleDateChange = (newDate: any) => {
    setBirthday(newDate);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!/^09\d{9}$/.test(form.mobile))
      errors.mobile = "شماره موبایل معتبر نیست";
    if (!form.password) errors.password = "پسورد را وارد کنید";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "رمزها یکسان نیستند";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const { data } = await register({
        variables: {
          mobile: form.mobile,
          email: form.email || undefined,
          password: form.password,
          birthday: birthday ? birthday.toDate().toISOString() : undefined,
        },
      });

      if (data?.register?.token) {
        localStorage.setItem("token", data.register.token);
        router.push("/panel");
      }
    } catch (err: any) {
      setApiError(err.message || "خطایی رخ داده است");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-4/5 md:w-4/6 lg:w-5/12 mt-8 p-4 rounded shadow-xl"
    >
      <Link
        href="/"
        className="flex justify-center items-center gap-2 border-b border-gray-200 pb-2"
      >
        <Image src="/logo/logo-3.png" alt="tinyfire" width={64} height={64} />
      </Link>

      {apiError && (
        <p className="text-red-600 text-sm mt-4 text-center">{apiError}</p>
      )}

      {/* Mobile */}
      <div className="flex flex-col mt-6 mb-2">
        <label htmlFor="mobile" className="mb-2">
          موبایل
        </label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="mobile"
          id="mobile"
          placeholder="09991112233"
          value={form.mobile}
          onChange={handleChange}
        />
        {formErrors.mobile && (
          <p className="text-red-500 text-sm mt-1">{formErrors.mobile}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col mb-2">
        <label htmlFor="email" className="mb-2">
          ایمیل (اختیاری)
        </label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col mb-2">
        <label htmlFor="password" className="mb-2">
          پسورد
        </label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          value={form.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col mb-2">
        <label htmlFor="confirmPassword" className="mb-2">
          تکرار پسورد
        </label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="*******"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {formErrors.confirmPassword}
          </p>
        )}
      </div>

      {/* Birthday */}
      <div className="flex flex-col mb-4">
        <label className="mb-2">تاریخ تولد</label>
        <JalaliCalendarDate value={birthday} onChange={handleDateChange} />
      </div>

      <div className="flex flex-col mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 py-2 px-8 text-white"
        >
          {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
