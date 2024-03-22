'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import service from '@/lib/axios';
import axios from 'axios';
import { headers } from 'next/headers';

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

function AccountForm({ token }: { token: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get('https://emur.dev/users/credentials', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.data);
        // console.log(user);
        setUser(response.data.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [token]);

  const onSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ): void => {
    // console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="mx-auto container flex flex-col gap-5 py-5">
      <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">Hesap Bilgileri</h1>
      {user && (
        <Formik
          initialValues={{
            name: user?.name || '',
            surname: user?.surname || '',
            email: user?.email || '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-5">
            <Input title="Adınız" name="name" className="w-[63%]" />
            <Input title="Soyadınız" name="surname" className="w-[63%]" />
            <div className="space-y-2 w-[63%]">
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
            <div className="w-[63%] flex items-center justify-center">
              <button
                className="rounded-md h-[40px] bg-[#00439A] text-white px-7 hover:bg-[#006CB5] transition duration-150"
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default AccountForm;
