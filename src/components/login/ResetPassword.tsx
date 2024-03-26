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
import service from '@/lib/axios';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  newpassword: Yup.string()
    .required('Bu alan zorunludur')
    .matches(/[A-Z]/, 'En az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'En az bir küçük harf içermelidir')
    .matches(/\d/, 'En az bir rakam içermelidir')
    .matches(/[\W_]/, 'En az bir noktalama işareti içermelidir')
    .min(8, 'Şifreniz en az 8 karakter olmalı')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı'),
  newpasswordAgain: Yup.string()
    .required('Bu alan zorunludur')
    .oneOf([Yup.ref('newpassword')], 'Şifreler eşleşmiyor'),
});

const initialValues = {
  newpassword: '',
  newpasswordAgain: '',
};

type FormValues = typeof initialValues;

function ResetPassword({ resetToken }: { resetToken: string }) {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | string>(false);
  const [isError, setIsError] = useState<boolean | any>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const onSubmit = (values: FormValues) => {
    service
      .put('/users/reset-password', {
        password: values.newpassword,
        token: resetToken,
      })
      .then((res) => {
        setIsSuccess(res.data.message);
        setIsError(false);
        setTimeout(() => {
          push('/login');
        }, 2000);
      })
      .catch((err) => {
        setIsError(err.response.data);
        setIsSuccess(false);
        setTimeout(() => {
          push('/');
        }, 2000);
      });
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
            {isError && (
              <div className="bg-red-500 text-white p-2 rounded-md">
                {isError?.message} <br />
                Ana sayfaya yönlendiriliyorsunuz...
              </div>
            )}
            {isSuccess && (
              <div className="bg-green-500 text-white p-2 rounded-md">
                {isSuccess} Giriş Sayfasına yönleniyorsunuz...
              </div>
            )}
            <div className="relative group">
              <label
                htmlFor="newpassword"
                className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px]
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs
                                ${
                                  props.errors.newpassword &&
                                  props.touched.newpassword
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200
                                ${
                                  props.values.newpassword.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
              >
                Şifre
              </label>
              <Field
                className={twMerge(`w-full border rounded-md h-[50px] text-darkGray border-darkGray px-4 pr-10 focus:border-[2px] focus:ring-0 focus:outline-none
                                        ${
                                          props.touched.newpassword &&
                                          props.errors.newpassword
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki'
                                        }`)}
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                id="newpassword"
                name="newpassword"
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
                name="newpassword"
                component="div"
                className="text-cst-primary"
              />
            </div>
            <div className="relative group">
              <label
                htmlFor="newpasswordAgain"
                className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px]
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs
                                ${
                                  props.errors.newpasswordAgain &&
                                  props.touched.newpasswordAgain
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200
                                ${
                                  props.values.newpasswordAgain.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
              >
                Şifreyi Tekrarla
              </label>
              <Field
                className={twMerge(`w-full border rounded-md h-[50px] text-darkGray border-darkGray px-4 pr-10 focus:border-[2px] focus:ring-0 focus:outline-none
                                        ${
                                          props.touched.newpasswordAgain &&
                                          props.errors.newpasswordAgain
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki'
                                        }`)}
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="off"
                id="newpasswordAgain"
                name="newpasswordAgain"
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
                name="newpasswordAgain"
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
