'use client';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import { IoEye } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { TurnBack } from '../reservations/page';

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

interface Values {
  password: string;
  newpassword: string;
  newpasswordAgain: string;
}

const onSubmit = (values: Values) => {
  // console.log(values);
};

const initialValues = {
  password: '',
  newpassword: '',
  newpasswordAgain: '',
};

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [password, setPassword] = useState(false);

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
    <div className="mx-auto container flex flex-col gap-5 py-5">
      <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">Şifre Değiştirme</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-5">
          <div className="relative  w-full md:w-[63%]">
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
              {password ? <IoEyeOffSharp size={20} /> : <IoEye size={20} />}
            </div>
          </div>
          <div className="relative w-full md:w-[63%]">
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
              {showPassword ? <IoEyeOffSharp size={20} /> : <IoEye size={20} />}
            </div>
          </div>
          <div className="relative w-full md:w-[63%]">
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
          <div className=" w-full md:w-[63%] pb-3 flex items-center justify-center">
            <button
              className="rounded-md h-[40px] bg-[#00439A] text-white px-7 hover:bg-[#006CB5] transition duration-150"
              type="submit"
            >
              Kaydet
            </button>
          </div>
        </Form>
      </Formik>
      <TurnBack />
    </div>
  );
}

export default ResetPasswordForm;
