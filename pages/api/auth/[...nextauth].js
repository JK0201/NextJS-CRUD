import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export const authOptions = {
  pages: {
    signIn: '/member/signin',
  },

  providers: [
    CredentialsProvider({
      async authorize(req) {
        const db = (await connectDB).db('next');
        let user = await db.collection('user_cred').findOne({ email: req.email });
        if (!user) {
          return null;
        }

        const passChk = await bcrypt.compare(req.pass, user.pass);
        if (!passChk) {
          return null;
        }
        return user;
      },
    }),
    KakaoProvider({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.kakao_account.profile.nickname,
          email: profile.kakao_account.email,
          role: profile.role ?? 'norm',
        };
      },
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    NaverProvider({
      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.nickname,
          email: profile.response.email,
          role: profile.role ?? 'norm',
        };
      },
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name,
          email: profile.email,
          role: profile.role ?? 'norm',
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.login,
          email: profile.email,
          role: profile.role ?? 'norm',
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  jwt: {
    maxAge: 60 * 60,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
