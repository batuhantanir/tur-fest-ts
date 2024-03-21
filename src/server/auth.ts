import { getServerSession, type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { userService } from './userService';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === 'credentials') {
        //(2)
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token, user }) { 
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: '/asd',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        return userService.authenticate(email, password);
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
