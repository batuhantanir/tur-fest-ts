'use client';
import React, { useState, useEffect } from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import axios from 'axios';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import service from '@/lib/axios';

interface User {
  name: string;
  surname: string;
  email: string;
}

interface AccountProps {}

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


const Account: React.FC<AccountProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    service
    .get('/users/credentials')
    .then((response) => {
      setUser(response.data.data);
      // console.log(user);
      setUser(response.data.data);
    })
      .catch((error) => {
        alert(error.message);
      });
    }, []);
    
    const onSubmit = (values: User, { setSubmitting }: FormikHelpers<User>) => {
      console.log(values);
      setSubmitting(false);
    };

    return (
      <>
      {!isMobile ? (
        <SettingsContainer>
          <div className="mx-auto container flex flex-col gap-5 py-5">
            <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
              Hesap Bilgileri
            </h1>
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
        </SettingsContainer>
      ) : (
        <div className="px-6 flex flex-col gap-5 py-5">
          <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
            Hesap Bilgileri
          </h1>
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
              <Input title="Adınız" name="name" />
              <Input title="Soyadınız" name="surname" />
              <div className="space-y-2">
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
          )}
        </div>
      )}
    </>
  );
}

export default Account;