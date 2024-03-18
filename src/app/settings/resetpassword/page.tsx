'use client';
import React, { useState } from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import { IoEye } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { useMediaQuery } from '@/lib/useMediaQuery';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

interface Values {
  password: string;
  newpassword: string;
  newpasswordAgain: string;
}

const validationSchema = Yup.object({
  password: Yup.string().required('Bu alan zorunludur'),
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
  password: '',
  newpassword: '',
  newpasswordAgain: '',
};

const onSubmit = (values: Values) => {
  console.log(values);
};

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [password, setPassword] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px');

  const handlePassword = () => {
    setPassword(!password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  return (
    <>
      {!isMobile ? (
        <SettingsContainer>
          <div className="mx-auto container flex flex-col gap-5 py-5">
            <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
              Şifre Değiştirme
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="flex flex-col gap-5">
                <div className="relative w-[63%]">
                  <Input
                    title="Şifreniz"
                    name="password"
                    className="w-full pr-[52px]"
                    type={password ? 'text' : 'password'}
                  />
                  <div
                    className="absolute right-5 top-[43px] flex items-center text-lightGray cursor-pointer"
                    onClick={handlePassword}
                  >
                    {password ? (
                      <IoEyeOffSharp size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </div>
                </div>
                <div className="relative w-[63%]">
                  <Input
                    title="Yeni Şifreniz"
                    name="newpassword"
                    className="w-full pr-[52px]"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <div
                    className="absolute right-5 top-[43px] flex items-center text-lightGray cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <IoEyeOffSharp size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </div>
                </div>
                <div className="relative w-[63%]">
                  <Input
                    title="Yeni Şifreniz Tekrar"
                    name="newpasswordAgain"
                    className="w-full pr-[52px]"
                    type={showPasswordAgain ? 'text' : 'password'}
                  />
                  <div
                    className="absolute right-5 top-[43px] flex items-cente text-lightGray cursor-pointer"
                    onClick={handleShowPasswordAgain}
                  >
                    {showPasswordAgain ? (
                      <IoEyeOffSharp size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </div>
                </div>
                <div className="w-[63%] pb-3 flex items-center justify-center">
                  <button
                    className="rounded-md h-[40px] bg-[#00439A] text-white px-7 hover:bg-[#006CB5] transition duration-150"
                    type="submit"
                  >
                    Kaydet
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </SettingsContainer>
      ) : (
        <div className="px-6 flex flex-col gap-5 py-5">
          <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
            Şifre Değiştirme
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="flex flex-col gap-5">
              <div className="relative">
                <Input
                  title="Şifreniz"
                  name="password"
                  className="pr-[52px]"
                  type={password ? 'text' : 'password'}
                />
                <div
                  className="absolute right-5 top-[43px] flex items-center  text-lightGray cursor-pointer"
                  onClick={handlePassword}
                >
                  {password ? <IoEyeOffSharp size={20} /> : <IoEye size={20} />}
                </div>
              </div>
              <div className="relative">
                <Input
                  title="Yeni Şifreniz"
                  name="newpassword"
                  className="pr-[52px]"
                  type={showPassword ? 'text' : 'password'}
                />
                <div
                  className="absolute right-5 top-[43px] flex items-center text-lightGray cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <IoEyeOffSharp size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </div>
              </div>
              <div className="relative">
                <Input
                  title="Yeni Şifreniz Tekrar"
                  name="newpasswordAgain"
                  className="pr-[52px] "
                  type={showPasswordAgain ? 'text' : 'password'}
                />
                <div
                  className="absolute right-5 top-[43px] flex items-center text-lightGray cursor-pointer"
                  onClick={handleShowPasswordAgain}
                >
                  {showPasswordAgain ? (
                    <IoEyeOffSharp size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="rounded-md h-[40px] bg-[#00439A] text-white px-7 hover:bg-[#006CB5] transition duration-150"
                  type="submit"
                >
                  Kaydet
                </button>
              </div>
              <Link
                href="/settings"
                className="flex items-center w-full justify-center py-2 cursor-pointer"
              >
                <IoIosArrowBack className="h-6 w-6 text-ilki" />
                <span className=" text-ilki mr-2">Geri dön</span>
              </Link>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
