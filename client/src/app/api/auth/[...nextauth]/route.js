import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from '../../../../../server/models';
const { User } = db;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        let dbUser = await User.findOne({ where: { email: profile.email } });

        if (!dbUser) {
          dbUser = await User.create({
            id: profile.sub, // if you're using Google's sub ID
            name: profile.name,
            email: profile.email,
          });
        }

        token.id = dbUser.id;
        token.accessToken = account.access_token;
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('SESSION CALLBACK:', { token, session });

      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }

      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
