import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userService } from './userService';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    async session({ token, session }) {
      if (token?.user) {
        session = token.user;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', user);
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const user = await userService.authenticate(email, password);
          if (!user) {
            throw new Error('Invalid credentials');
            return null;
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
