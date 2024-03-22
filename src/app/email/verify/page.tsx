'use client';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useRouter, useSearchParams } from 'next/navigation';
import service from '@/lib/axios';

function Verify() {
  const params = useSearchParams();
  // console.log(params)
  const verifyToken = params.get('verify_token') || '';
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    service
      .put('/email/verify?verify_token=' + verifyToken)
      .then((res) => {
        if (res.status == 200) {
          setVerified(true);
          setTimeout(() => {
            router.push('/login');
          }, 1200);
        }
      })
      .catch((error) => {
        error && setError(true);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (error)
    return (
      <div>
        <h1>Bir şeyler ters gitti</h1>
        <p>E-postanız doğrulanırken bir hata oluştu.</p>
        <p>Doğrulama linkini süresi dolmuş olabilir.</p>
        <p>Anasayfaya yönlendiriliyorsunuz...</p>
      </div>
    );

  return <div>{verified ? 'verified' : 'not verified'}</div>;
}

export default Verify;
