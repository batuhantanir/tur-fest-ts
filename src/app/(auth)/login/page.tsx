'use client';
import LoginContainer from '@/components/login/LoginContainer';
import withAuth from '@/components/withAuth';
import { loginDetails } from '@/constants/config';
import { isLocal } from '@/constants/env';
import service from '@/lib/axios';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { IoEye, IoEyeOffSharp } from 'react-icons/io5';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  mail: Yup.string()
    .required('Bu alan zorunludur')
    .email('Geçerli bir e-posta adresi giriniz'),
  password: Yup.string().required('Bu alan zorunludur'),
});

const initialValues = {
  mail: isLocal ? loginDetails.email : '',
  password: isLocal ? loginDetails.password : '',
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, login } = useAuthStore();

  const onSubmit = (values) => {
    const updateValues = { email: values.mail, password: values.password };
    setLoading(true);
    service
      .post('/auth/login', updateValues)
      .then(function (res) {
        const accessToken = res.data.data.auth_token;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        } else {
          alert('Bir hata oluştu');
        }
        login(res.data.data.user);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.message);
        // setLoading(false);
      });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer
      title="Hoşgeldiniz"
      description="Hesabınıza giriş yapın ve devam edin."
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className="flex flex-col w-full gap-4">
            <div className="relative group">
              <label
                htmlFor="mail"
                className={cn(
                  'absolute left-4 top-3 select-none text-gray-400 text-base group-focus-within:top-[-6px] group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs group-focus-within:text-ilki',
                  {
                    'group-focus-within:text-destructive-foreground text-destructive-foreground':
                      props.errors.mail && props.touched.mail,
                    'top-[-6px] text-xs px-1 left-[13px]  bg-white':
                      props.values.mail.length >= 1,
                  }
                )}
              >
                E-posta
              </label>
              <Field
                className={cn(
                  'w-full text-black border rounded-md h-[50px] px-4 pr-10 border-darkGray focus:border-[2px] focus:outline-none focus:ring-0 focus:border-ilki',
                  {
                    'border-red-500 focus:border-red-500 border-[2px]':
                      props.touched.mail && props.errors.mail,
                  }
                )}
                type="text"
                autoComplete="off"
                id="mail"
                name="mail"
              />
              <ErrorMessage
                name="mail"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <div className="relative group">
                <label
                  htmlFor="password"
                  className={cn(
                    'absolute left-4 top-3 text-base group-focus-within:text-ilki group-focus-within:bg-white transition-all duration-200 text-gray-400 select-none  group-focus-within:top-[-6px] group-focus-within:px-1 group-focus-within:left-[13px] group-focus-within:text-xs',
                    {
                      'group-focus-within:text-red-500 text-red-500':
                        props.errors.password && props.touched.password,
                      'top-[-6px] text-xs px-1 left-[13px]  bg-white':
                        props.values.password.length >= 1,
                    }
                  )}
                >
                  Şifre {loading ? 'loading' : ''}
                </label>
                <Field
                  className={cn(
                    'w-full border rounded-md h-[50px] focus:border-ilki text-darkGray border-darkGray px-4 pr-10 focus:border-[2px] focus:ring-0 focus:outline-none',
                    {
                      'border-red-500 focus:border-red-500 border-[2px]':
                        props.touched.password && props.errors.password,
                    }
                  )}
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
                  className="text-red-500"
                />
              </div>
              <div className="relative flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Field
                    className="w-4 h-4 rounded-md accent-primary"
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                  />
                  <label
                    className="cursor-pointer text-darkGray"
                    htmlFor="rememberMe"
                  >
                    Beni Hatırla
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-black cursor-pointer hover:text-ilki"
                >
                  Şifremi unuttum?
                </Link>
              </div>
            </div>
            <button
              className="w-full mb-2 rounded-md h-[40px]  bg-ilki text-white px-4 hover:bg-ilki/90 transition duration-200"
              type="submit"
            >
              Giriş Yap
            </button>
            <div className="flex items-center justify-center w-full gap-2 p-2 py-4 border-t">
              Hesabın yok mu?
              <Link href="/register" className="cursor-pointer text-ilki">
                Kaydol
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </LoginContainer>
  );
};

export default withAuth(Login, 'auth');
