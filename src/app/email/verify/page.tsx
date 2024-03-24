'use client';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useRouter, useSearchParams } from 'next/navigation';
import service from '@/lib/axios';

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
      <div className="flex-1 min-h-full flex items-center justify-center text-white">
        <div className="bg-red-400 rounded-md px-8 py-6 space-y-4 max-w-[25em]">
          <h1 className="text-xl font-semibold">Bir şeyler ters gitti</h1>
          <div className="space-y-0.5">
            <p className="font-medium">
              E-postanız doğrulanırken bir hata oluştu. Doğrulama linkini süresi
              dolmuş olabilir. Anasayfaya yönlendiriliyorsunuz...
            </p>
            <p>Hata: {error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex-1 min-h-full flex items-center justify-center text-white">
      {verified ? (
        <div className="bg-green-400 rounded-md px-8 py-6 space-y-4 max-w-[25em]">
          <h1 className="text-xl font-semibold">Hesabınız Doğrulandı</h1>
          <div className="space-y-0.5">
            <p className="font-medium">
              Hesabınızın doğrulanması gerçekleşti <br />
              Giriş sayfasına yönlendiriliyorsunuz...
            </p>
            <p>{verified}</p>
          </div>
        </div>
      ) : (
        <div>bir hata oluştu</div>
      )}
    </div>
  );
}

export default Verify;
