'use client';
import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import { IoEye } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { signOut } from 'next-auth/react';
import TurnBack from '../TurnBack';
import axios from 'axios';

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Bu alan zorunludur')
    .matches(/[A-Z]/, 'En az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'En az bir küçük harf içermelidir')
    .matches(/\d/, 'En az bir rakam içermelidir')
    .matches(/[\W_]/, 'En az bir noktalama işareti içermelidir')
    .min(8, 'Şifreniz en az 8 karakter olmalı')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı'),
  newpassword: Yup.string()
    .required('Bu alan zorunludur')
    .matches(/[A-Z]/, 'En az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'En az bir küçük harf içermelidir')
    .matches(/\d/, 'En az bir rakam içermelidir')
    .matches(/[\W_]/, 'En az bir noktalama işareti içermelidir')
    .min(8, 'Şifreniz en az 8 karakter olmalı')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı')
    .notOneOf(
      [Yup.ref('password')],
      'Yeni oluşturacağınız şifre eskisiyle aynı olamaz'
    ),
  newpasswordAgain: Yup.string()
    .required('Bu alan zorunludur')
    .oneOf([Yup.ref('newpassword')], 'Şifreler eşleşmiyor'),
});

interface Values {
  password: string;
  newpassword: string;
  newpasswordAgain: string;
}

function ResetPasswordForm({ token }: { token: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [password, setPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const initialValues = {
    password: '',
    newpassword: '',
    newpasswordAgain: '',
  };

  const handlePassword = () => {
    setPassword(!password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>): void => {
    setError(false);
    axios
      .put(
        'https://emur.dev/users/change-password',
        {
          old_password: values.password,
          new_password: values.newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMessage('Şifreniz başarıyla güncellendi. Çıkış yapılıyor..');
        setSubmitting(false);
        setTimeout(() => {
          signOut();
        }, 3500);
      })
      .catch((error) => {
        console.log(error.message);
        setMessage('Eski şifreniz yanlış. Lütfen tekrar deneyin.');
        setError(true);
        setSubmitting(false);
      });
  };

  return (
    <div className="md:container flex flex-col gap-5 py-5">
      <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">Şifre Değiştirme</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
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
                {showPassword ? (
                  <IoEyeOffSharp size={20} />
                ) : (
                  <IoEye size={20} />
                )}
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
            {message !== null && (
              <p
                className={`pl-1 ${
                  error === true ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {message}
              </p>
            )}
            <div className=" w-full md:w-[63%] pb-3 flex items-center justify-center">
              <button
                className="rounded-md h-[40px] bg-[#00439A] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00439A] text-white px-7 hover:bg-[#006CB5] transition duration-150"
                type="submit"
                disabled={!isValid || !dirty}
              >
                {!isSubmitting ? "Kaydet" : "Kaydediliyor..."}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <TurnBack />
    </div>
  );
}

export default ResetPasswordForm;
