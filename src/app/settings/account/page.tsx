'use client';
import React, { useState } from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/general/CustomInput';
import axios from 'axios';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

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

axios
  .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/credentials`)
  .then(function (response) {
    if (response.status === 200) {
      setUser(response.data.data);
    }
  })
  .catch(function (error) {
    alert(error.message);
  });

const onSubmit = (values) => {
  console.log(values);
};
const initialValues = {
  name: 'john',
  surname: 'doe',
  email: 'johndoe@gmail.com',
};

function Account() {
  const [user, setUser] = useState({});
  const isMobile = useMediaQuery(768);

  return (
    <>
      {!isMobile ? (
        <SettingsContainer>
          <div className="mx-auto container flex flex-col gap-5 py-5">
            <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
              Hesap Bilgileri
            </h1>
            <Formik
              initialValues={initialValues}
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
          </div>
        </SettingsContainer>
      ) : (
        <div className="px-6 flex flex-col gap-5 py-5">
          <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
            Hesap Bilgileri
          </h1>
          <Formik
            initialValues={initialValues}
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
        </div>
      )}
    </>
  );
}

export default Account;
