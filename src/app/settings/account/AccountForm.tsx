'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import axios from 'axios';
import TurnBack from '../TurnBack';
import { signOut } from 'next-auth/react';

interface User {
  email: string;
  name: string;
  surname: string;
}

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
  email: Yup.string()
    .required('Bu alan zorunludur')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Geçerli bir e-posta adresi giriniz'
    ),
});

interface authSession {
  user: {
    name: string;
    surname: string;
    email: string;
  };
  auth_token: string;
}

function AccountForm({ authSession }: { authSession: authSession }) {
  const [message, setMessage] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // Flag to track form submission
  const [emailToken , setEmailToken] = useState<string>(''); // Email change token
  const token = authSession.auth_token;

  const initialValues = {
    name: authSession.user.name || '',
    surname: authSession.user.surname || '',
    email: authSession.user.email || '',
  };

  const onSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ): void => {
    axios
      .put(
        'https://emur.dev/users/credentials',
        {
          name: values.name,
          surname: values.surname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSubmitting(false);
        setMessage(true);
        setTimeout(() => {
          signOut();
        }, 3500);
      })
      .catch((error) => {
        console.log(error.message);
        setSubmitting(false);
      })
      .finally(() => {
        setFormSubmitted(true);
      });
  };

  const getEmailToken = (values: User) => {
    axios
      .post(
        'https://emur.dev/users/get-change-email-token',
        { email: values.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEmailToken(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const emailSubmit = (values: User) => {
    axios
      .put(
        'https://emur.dev/users/change-email',
        {
          token: emailToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
       console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (formSubmitted && initialValues.email !== authSession.user.email) {
      emailSubmit(initialValues);
      getEmailToken(initialValues);
    }
  }, [formSubmitted, initialValues.email, authSession.user.email]);

  return (
    <div className="md:container flex flex-col gap-5 py-5">
      <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">Hesap Bilgileri</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting }) => (
          <Form className="flex flex-col items-center md:items-start gap-5 w-full">
            <Input title="Adınız" name="name" className="w-full md:w-[63%]" />
            <Input
              title="Soyadınız"
              name="surname"
              className="w-full md:w-[63%]"
            />
            <div className="space-y-2 w-full md:w-[63%]">
              <Input
                title="E-posta Adresiniz"
                name="email"
                className="w-full"
              />
              <p className="text-sm text-[#7C7C84] pl-1">
                E-posta adresinizi 10 gün aralıklarla tekrar
                değiştirebilirsiniz.
              </p>
            </div>
            {message === true && (
              <p className="text-green-500">
                Bilgileriniz başarıyla güncellendi. Tekrar giriş yapınız..
              </p>
            )}
            <div className="w-[63%] flex items-center justify-center">
              <button
                className={`rounded-md h-[40px] bg-[#00439A] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00439A] text-white px-7 hover:bg-[#006CB5] transition duration-150`}
                type="submit"
                disabled={!dirty || isSubmitting || message}
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <TurnBack />
    </div>
  );
}

export default AccountForm;
