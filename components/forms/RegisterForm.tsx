"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/apollo/mutations";
import JalaliCalendarDate from "./inputs/JalaliCalendarDate";
import Link from "next/link";
import Image from "next/image";
import { useMessageStore } from "@/stores/messageStore";

const RegisterForm = () => {
  const router = useRouter();
  const { showMessage } = useMessageStore();

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    wholesaler: false,
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
    if (!form.full_name) errors.full_name = "این فیلد اجباری است";
    if (!form.password) errors.password = "پسورد را وارد کنید";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "رمزها یکسان نیستند";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showMessage({
      key: "register",
      type: "loading",
      content: "در حال ثبت اطلاعات",
    });
    setApiError("");
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      showMessage({ key: "register", type: "error", content: "خطا در پردازش" });
      setTimeout(() => {
        setFormErrors(errors);
        return;
      }, 1000);
    }

    try {
      const { data } = await register({
        variables: {
          full_name: form.full_name,
          mobile: form.mobile,
          email: form.email || undefined,
          password: form.password,
          birthday: birthday ? birthday.toDate().toISOString() : undefined,
          wholesaler: form.wholesaler,
        },
      });

      if (data?.register?.token) {
        localStorage.setItem("token", data.register.token);
        showMessage({
          key: "register",
          type: "success",
          content: "ثبت نام با موفقیت انجام شد",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err: any) {
      showMessage({ type: "error", content: "خطا در پردازش" });
      setApiError(err.message || "خطایی رخ داده است");
    }
  };

  const handleWholesalerChange = (value: boolean) => {
    setForm({ ...form, wholesaler: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-4/5 md:w-4/6 lg:w-5/12 my-8 p-4 rounded shadow-xl"
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
      <div className="flex flex-col mt-6 mb-4">
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
      <div className="flex flex-col mb-4">
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

      {/* NAME */}
      <div className="flex flex-col mb-2">
        <label htmlFor="full_name" className="mb-4">
          نام و نام خانوادگی
        </label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="full_name"
          id="full_name"
          placeholder="علی همتا"
          value={form.full_name}
          onChange={handleChange}
        />
        {formErrors.full_name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.full_name}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col mb-4">
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
      <div className="flex flex-col mb-4">
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

      <div className="flex flex-col mb-4">
        <label className="mb-2">آیا عمده‌فروش هستید؟</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              form.wholesaler
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleWholesalerChange(true)}
          >
            بله
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              !form.wholesaler
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleWholesalerChange(false)}
          >
            خیر
          </button>
        </div>
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
