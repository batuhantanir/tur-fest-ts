'use client';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useRouter, useSearchParams } from 'next/navigation';
import service from '@/lib/axios';
import { FiCheckCircle } from 'react-icons/fi';
import { IoCloseCircleOutline } from 'react-icons/io5';

function Verify() {
  const params = useSearchParams();
  const verifyToken = params.get('verify_token') || '';
  const router = useRouter();
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const reset = () => {
    setLoading(false);
    router.replace('/');
  };

  useEffect(() => {
    verifyToken || verifyToken.length !== 0
      ? service
          .put('/email/verify?verify_token=' + verifyToken)
          .then((res) => {
            setVerified(res.data.message);
            console.log(res);
            setTimeout(() => {
              router.push('/login');
            }, 1200);
          })
          .catch((error) => {
            error && setError(error.message);
            setTimeout(() => {
              router.push('/');
            }, 2000);
          })
          .finally(() => {
            setLoading(false);
          })
      : reset();
  }, []);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="flex-1 min-h-full flex items-center justify-center text-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center space-y-2 flex flex-col items-center">
            <IoCloseCircleOutline className="w-14 h-14 text-red-500" />
            <h1 className="text-3xl font-bold">Bir şeyler ters gitti.</h1>
            <p className="text-gray-500 dark:text-gray-400">
              E-postanız doğrulanırken bir hata oluştu. <br />
              Doğrulama linkini süresi dolmuş olabilir.
              <br /> Anasayfaya yönlendiriliyorsunuz...
            </p>
            <p>{verified}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex-1 min-h-full flex items-center justify-center text-black">
      {verified ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center space-y-2 flex flex-col items-center">
            <FiCheckCircle className="w-14 h-14 text-green-500" />
            <h1 className="text-3xl font-bold">Email Doğrulandı.</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Hesabınızın doğrulanması gerçekleşti <br />
              Giriş sayfasına yönlendiriliyorsunuz...
            </p>
            <p>{verified}</p>
          </div>
        </div>
      ) : (
        <div className="text-lg font-medium">bir hata oluştu.</div>
      )}
    </div>
  );
}

export default Verify;
