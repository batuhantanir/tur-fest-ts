'use client';
import React, { useState } from 'react';
import LoginContainer from './LoginContainer';
import { IoEye } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { twMerge } from 'tailwind-merge';
import * as Yup from 'yup';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

const validationSchema = Yup.object({
  mail: Yup.string()
    .required('Bu alan zorunludur')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Geçerli bir e-posta adresi giriniz'
    ),
  password: Yup.string().required('Bu alan zorunludur'),
});

const initialValues = {
  newPassword: '',
  newPasswordRepeat: '',
};

type FormValues = typeof initialValues;

const onSubmit = (values:FormValues) => {
  console.log(values);
};

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <LoginContainer
      title="Yeni Şifre"
      description="Şifrenizi oluşturup giriş yapabilirsiniz."
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className="flex flex-col gap-4 w-full">
            <div className="relative group">
              <label
                htmlFor="newPassword"
                className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px]
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs
                                ${
                                  props.errors.newPassword &&
                                  props.touched.newPassword
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200
                                ${
                                  props.values.newPassword.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
              >
                Şifre
              </label>
              <Field
                className={twMerge(`w-full border rounded-md h-[50px] text-darkGray border-darkGray px-4 pr-10 focus:border-[2px] focus:ring-0 focus:outline-none
                                        ${
                                          props.touched.newPassword &&
                                          props.errors.newPassword
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki'
                                        }`)}
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                id="newPassword"
                name="newPassword"
              />
              <div
                className="absolute right-4 top-[26px] transfrom -translate-y-1/2  text-lightGray cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <IoEyeOffSharp size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-cst-primary"
              />
            </div>
            <div className="relative group">
              <label
                htmlFor="newPasswordRepeat"
                className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px]
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs
                                ${
                                  props.errors.newPasswordRepeat &&
                                  props.touched.newPasswordRepeat
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200
                                ${
                                  props.values.newPasswordRepeat.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
              >
                Şifreyi Tekrarla
              </label>
              <Field
                className={twMerge(`w-full border rounded-md h-[50px] text-darkGray border-darkGray px-4 pr-10 focus:border-[2px] focus:ring-0 focus:outline-none
                                        ${
                                          props.touched.newPasswordRepeat &&
                                          props.errors.newPasswordRepeat
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki'
                                        }`)}
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="off"
                id="newPasswordRepeat"
                name="newPasswordRepeat"
              />
              <div
                className="absolute right-4 top-[26px] transfrom -translate-y-1/2  text-lightGray cursor-pointer"
                onClick={handleShowNewPassword}
              >
                {showNewPassword ? (
                  <IoEyeOffSharp size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </div>
              <ErrorMessage
                name="newPasswordRepeat"
                component="div"
                className="text-cst-primary"
              />
            </div>

            <button
              className="w-full rounded-md h-[40px]  bg-ilki text-white px-4 hover:bg-ilki/90 transition duration-200"
              type="submit"
            >
              Şifreni Değiştir
            </button>
            <Link
              href="/login"
              className="flex items-center w-full justify-center p-2 gap-1 cursor-pointer"
            >
              <IoIosArrowBack className="h-6 w-6 text-ilki" />
              <span className=" text-ilki mr-2">Anasayfaya dön</span>
            </Link>
          </Form>
        )}
      </Formik>
    </LoginContainer>
  );
}

export default ResetPassword;
