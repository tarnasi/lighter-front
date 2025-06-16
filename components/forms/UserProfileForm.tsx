"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useUserMe, useUserUpdateProfile } from "@/hooks/useUser";
import JalaliCalendarDate from "@/components/forms/inputs/JalaliCalendarDate";
import DateObject from "react-date-object";
import LoadingSkeleton from "../LoadingSkeleton";

const UserProfileForm: React.FC = () => {
  const [form] = Form.useForm();
  const { userData, loading, error } = useUserMe();
  const { updateProfile, updateLoading } = useUserUpdateProfile();
  const [userBirthday, setUserBirthday] = useState<DateObject | null>();

  useEffect(() => {
    if (userData?.me) {
      const user_birthday = new DateObject(userData.me?.birthday)
      console.log(user_birthday);
      setUserBirthday(user_birthday)
      form.setFieldsValue({
        full_name: userData.me.full_name,
        email: userData.me.email,
        mobile: userData.me.mobile,
        birthday: user_birthday,
      });
    }
  }, [userData, form]);

  const onFinish = async (values: any) => {
    try {
      const input = {
        full_name: values.full_name,
        email: values.email,
        mobile: values.mobile,
        birthday: values.birthday,
      };
      await updateProfile({ variables: { input } });
      message.success("پروفایل با موفقیت به‌روزرسانی شد!");
    } catch (err) {
      message.error("خطا در به‌روزرسانی پروفایل.");
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return <div className="text-red-500 text-center">خطا: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-baseline justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md sm:max-w-lg lg:max-w-2xl">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            پروفایل شما
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ویرایش اطلاعات از طریق فرم زیر
          </p>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            name="full_name"
            label="نام و نام خانوادگی"
            rules={[{ required: true, message: "لطفا نام خود را وارد کنید" }]}
          >
            <Input className="rounded-md" placeholder="نام و نام خانوادگی" />
          </Form.Item>

          <Form.Item
            name="email"
            label="ایمیل"
            rules={[{ type: "email", message: "ایمیل معتبر وارد کنید" }]}
          >
            <Input className="rounded-md" placeholder="ایمیل" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="شماره موبایل"
            rules={[{ required: true, message: "شماره موبایل الزامی است" }]}
          >
            <Input className="rounded-md" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
          </Form.Item>

          <Form.Item name="birthday" label="تاریخ تولد">
            <JalaliCalendarDate
              value={form.getFieldValue("birthday")}
              onChange={(val: any) => form.setFieldsValue({ birthday: new DateObject(val) })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              ذخیره تغییرات
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserProfileForm;
