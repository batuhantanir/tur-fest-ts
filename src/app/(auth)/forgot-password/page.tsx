'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { twMerge } from 'tailwind-merge';
import LoginContainer from '@/components/login/LoginContainer';
import { FcLock } from 'react-icons/fc';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

const validationSchema = Yup.object({
  mail: Yup.string()
    .required('Bu alan zorunludur')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Geçerli bir e-posta adresi giriniz'
    ),
});

const InitialComponent = () => {
  return (
    <>
      <LoginContainer
        title="Şifreni mi unuttun?"
        description="Email adresine gelen bağlantı ile şifre yenileme ekranına gidebilirsin"
        titleIcon={<FcLock size={29} />}
      >
        <Formik
          initialValues={{ mail: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form submitted with values:', values);
          }}
        >
          {(props) => (
            <Form className="flex flex-col gap-4 w-full">
              <div className="relative mb-2 group">
                <label
                  htmlFor="mail"
                  className={twMerge(
                    `absolute left-4 top-[14px] select-none text-gray-400 group-focus-within:top-[-8px] group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs 
                                        ${
                                          props.errors.mail &&
                                          props.touched.mail
                                            ? 'group-focus-within:text-cst-primary text-cst-primary'
                                            : 'group-focus-within:text-ilki text-gray-400'
                                        }
                                         group-focus-within:bg-white dark:group-focus-within:bg-ComponentColorDark transition-all duration-200`,
                    props.values.mail.length >= 1
                      ? 'top-[-8px] text-xs px-1 left-[13px]  bg-white'
                      : 'text-base'
                  )}
                >
                  E-posta
                </label>
                <Field
                  className={`w-full dark:bg-ComponentColorDark border rounded-md h-[56px] px-4 border-darkGray focus:border-[2px] focus:outline-none focus:ring-0 focus:border-ilki
                                    ${
                                      props.touched.mail && props.errors.mail
                                        ? 'border-cst-primary focus:border-cst-primary border-[2px]'
                                        : 'focus:border-ilki'
                                    }`}
                  type="text"
                  autoComplete="off"
                  id="mail"
                  name="mail"
                />
                <ErrorMessage
                  name="mail"
                  component="div"
                  className="mt-1 text-cst-primary"
                />
              </div>
              <button
                className="w-full rounded-md h-[40px] bg-ilki text-white px-4 hover:bg-ilki/90 transition duration-150"
                type="submit"
              >
                Bağlantıyı Gönder
              </button>
              <Link
                href="/login"
                className="flex items-center w-full justify-center p-2 cursor-pointer"
              >
                <IoIosArrowBack className="h-6 w-6 text-ilki" />
                <span className=" text-ilki mr-2">Geri dön</span>
              </Link>
            </Form>
          )}
        </Formik>
      </LoginContainer>
    </>
  );
};

export default InitialComponent;
