'use client';
import LoginContainer from '@/components/login/LoginContainer';
import withAuth from '@/components/withAuth';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { IoEye, IoEyeOffSharp } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Bu alan zorunludur')
    .matches(
      /^(?!\s*$)[a-zA-ZçğıöşüÇĞİÖŞÜ\s]{1,20}$/,
      'Geçerli bir ad giriniz'
    ),
  surname: Yup.string()
    .required('Bu alan zorunludur')
    .matches(
      /^(?!\s*$)[a-zA-ZçğıöşüÇĞİÖŞÜ]{1,20}$/,
      'Geçerli bir soyad giriniz'
    ),
  mail: Yup.string()
    .required('Bu alan zorunludur')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Geçerli bir e-posta adresi giriniz'
    ),
  password: Yup.string()
    .required('Bu alan zorunludur')
    .matches(/[A-Z]/, 'En az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'En az bir küçük harf içermelidir')
    .matches(/\d/, 'En az bir rakam içermelidir')
    .matches(/[\W_]/, 'En az bir noktalama işareti içermelidir')
    .min(8, 'Şifreniz en az 8 karakter olmalı')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı'),
  passwordAgain: Yup.string()
    .required('Bu alan zorunludur')
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor'),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  interface SubmitValues {
    mail: string;
    password: string;
    name: string;
    surname: string;
    passwordAgain: string;
  }
  const onSubmit = async (values: SubmitValues, { setFieldError }: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          email: values.mail,
          password: values.password,
          name: values.name,
          surname: values.surname,
        }
      );
    } catch (error) {
      let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
        setFieldError('mail', errorMessage);
      } else {
        setFieldError('mail', errorMessage);
      }
    }
  };

  return (
    <>
      <LoginContainer title="Üye Ol" description="">
        <Formik
          initialValues={{
            mail: '',
            password: '',
            name: '',
            surname: '',
            passwordAgain: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className="flex flex-col w-full gap-4">
              <div className="flex w-full gap-3">
                <div className="relative w-1/2 group">
                  <label
                    htmlFor="name"
                    className={twMerge(` absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px] 
                                        group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs 
                                        ${
                                          props.errors.name &&
                                          props.touched.name
                                            ? 'group-focus-within:text-cst-primary text-cst-primary'
                                            : 'group-focus-within:text-ilki text-gray-400'
                                        }
                                         group-focus-within:bg-white transition-all duration-200  
                                        ${
                                          props.values.name.length >= 1
                                            ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                            : 'text-base'
                                        }`)}
                  >
                    Ad
                  </label>
                  <Field
                    className={`w-full text-darkGray border rounded-md h-[50px] px-4 border-darkGray focus:border-[2px] focus:outline-none focus:ring-0 
                                        ${
                                          props.touched.name &&
                                          props.errors.name
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki '
                                        } 
                                        `}
                    type="text"
                    autoComplete="off"
                    id="name"
                    name="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-cst-primary"
                  />
                </div>
                <div className="relative w-1/2 group">
                  <label
                    htmlFor="surname"
                    className={twMerge(` absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px] 
                                        group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs 
                                        ${
                                          props.errors.surname &&
                                          props.touched.surname
                                            ? 'group-focus-within:text-cst-primary text-cst-primary'
                                            : 'group-focus-within:text-ilki text-gray-400'
                                        }
                                        group-focus-within:bg-white transition-all duration-200  
                                        ${
                                          props.values.surname.length >= 1
                                            ? 'top-[-6px] text-xs px-1 left-[13px] bg-white'
                                            : 'text-base'
                                        }`)}
                  >
                    Soyad
                  </label>
                  <Field
                    className={`w-full text-darkGray border rounded-md h-[50px] px-4 border-darkGray focus:border-[2px] focus:outline-none focus:ring-0 
                                        ${
                                          props.touched.surname &&
                                          props.errors.surname
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki '
                                        }`}
                    type="text"
                    autoComplete="off"
                    id="surname"
                    name="surname"
                  />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="text-cst-primary"
                  />
                </div>
              </div>
              <div className="relative group">
                <label
                  htmlFor="mail"
                  className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px] 
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs 
                                ${
                                  props.errors.mail && props.touched.mail
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200  
                                ${
                                  props.values.mail.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
                >
                  E-posta
                </label>
                <Field
                  className={`w-full border rounded-md h-[50px] px-4  focus:border-[2px] focus:outline-none focus:ring-0 
                                    ${
                                      props.touched.mail && props.errors.mail
                                        ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                        : 'focus:border-ilki '
                                    }`}
                  type="text"
                  autoComplete="off"
                  id="mail"
                  name="mail"
                />
                <ErrorMessage
                  name="mail"
                  component="div"
                  className="text-cst-primary"
                />
              </div>
              <div className="relative group">
                <label
                  htmlFor="password"
                  className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px] 
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs 
                                ${
                                  props.errors.password &&
                                  props.touched.password
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200  
                                ${
                                  props.values.password.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
                >
                  Şifre
                </label>
                <Field
                  className={`w-full border rounded-md h-[50px] px-4 focus:border-[2px] focus:ring-0 focus:outline-none 
                                        ${
                                          props.touched.password &&
                                          props.errors.password
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki'
                                        }`}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  id="password"
                  name="password"
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
                  name="password"
                  component="div"
                  className="text-cst-primary"
                />
              </div>
              <div className="relative group">
                <label
                  htmlFor="passwordAgain"
                  className={twMerge(`absolute left-4 top-3 select-none text-gray-400 group-focus-within:top-[-6px] 
                                group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs 
                                ${
                                  props.errors.passwordAgain &&
                                  props.touched.passwordAgain
                                    ? 'group-focus-within:text-cst-primary text-cst-primary'
                                    : 'group-focus-within:text-ilki text-gray-400'
                                }
                                 group-focus-within:bg-white transition-all duration-200  
                                ${
                                  props.values.passwordAgain.length >= 1
                                    ? 'top-[-6px] text-xs px-1 left-[13px]  bg-white'
                                    : 'text-base'
                                }`)}
                >
                  Şifreyi Tekrarla
                </label>
                <Field
                  className={`w-full border rounded-md h-[50px] text-darkGray border-darkGray px-4 focus:border-[2px] focus:ring-0 focus:outline-none 
                                        ${
                                          props.touched.passwordAgain &&
                                          props.errors.passwordAgain
                                            ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                            : 'focus:border-ilki'
                                        }`}
                  type={showPasswordAgain ? 'text' : 'password'}
                  autoComplete="off"
                  id="passwordAgain"
                  name="passwordAgain"
                />
                <div
                  className="absolute right-4 top-[26px] transfrom -translate-y-1/2  text-lightGray cursor-pointer"
                  onClick={handleShowPasswordAgain}
                >
                  {showPasswordAgain ? (
                    <IoEyeOffSharp size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </div>
                <ErrorMessage
                  name="passwordAgain"
                  component="div"
                  className="text-cst-primary"
                />
              </div>
              <button
                className="w-full mb-2 rounded-md h-[40px]  bg-ilki text-white px-4 hover:bg-ilki/90 transition duration-200"
                type="submit"
              >
                Hemen Üye Ol
              </button>
              <div className="flex items-center justify-center w-full gap-2 py-4 border-t">
                Zaten bir hesabın var mı?
                <Link href="/login" className="cursor-pointer text-ilki">
                  Giriş Yap
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </LoginContainer>
    </>
  );
}

export default withAuth(Register, 'auth');
