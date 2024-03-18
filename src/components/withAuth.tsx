'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import service from '@/lib/axios';
import { getFromLocalStorage } from '@/lib/helper';

import { useAuthStore } from '@/store/useAuthStore';
import Loading from '@/app/loading';

const HOME_ROUTE = '/';
const LOGIN_ROUTE = '/login';

export default function withAuth(Component: React.ComponentType<any>, routeRole: string) {
  const ComponentWithAuth = (props: any) => {
    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();
    const {
      isAuthenticated,
      setLoading,
      isLoading,
      login,
      logout,
      user,
    } = useAuthStore();

    const checkAuth = React.useCallback(() => {
      const token = getFromLocalStorage('accessToken');
      if (!token) {
        isAuthenticated && logout();
        setLoading(false);
        return;
      }
      const loadUser = async () => {
        try {
          const { data } = await service.get('/users/credentials');
          const userData = data.data;
          login({
            ...userData,
            token: String(token),
          });
        } catch (err) {
          localStorage.removeItem('accessToken');
        } finally {
          setLoading(false);
        }
      };

      if (!isAuthenticated) {
        loadUser();
      }
    }, [isAuthenticated, login, logout]);

    React.useEffect(() => {
      checkAuth();
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          if (routeRole === 'auth') {
            if (searchParams.get('redirect')) {
              router.replace(searchParams.get('redirect') || HOME_ROUTE);
            } else {
              router.replace(HOME_ROUTE);
            }
          }
        } else {
          if (routeRole !== 'auth' && routeRole !== 'optional') {
            router.replace(`${LOGIN_ROUTE}?redirect=${pathname}`, {
              scroll: false,
            });
          }
        }
      }
    }, [isAuthenticated, isLoading, pathname, router, searchParams, user]);

    if (isLoading) {
      return <Loading />;
    }
    if (
      (isLoading || !isAuthenticated) &&
      routeRole !== 'auth' &&
      routeRole !== 'optional'
    ) {
      return <Loading />;
    }
    return <Component {...props} user={user} />;
  };

  return ComponentWithAuth;
}
