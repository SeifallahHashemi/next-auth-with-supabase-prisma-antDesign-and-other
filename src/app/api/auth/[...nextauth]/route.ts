import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";

interface DatabaseProps {
  id: string | number
  username?: string
  email?: string
  password?: string
}
type IdProps = {
  id: string | number
};
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please fill all Fields");
        }
        const userExist = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });
        if (!userExist) {
          throw new Error("user Not found");
        }
        const passwordMatch = await compare(
          credentials.password,
          userExist.password,
        );
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        return {
          id: userExist.id.toString(),
          email: userExist.email,
          username: userExist.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser, session, trigger }) {
      // console.log("jwt token callback: ", { token, user, account, profile, session})
      if (trigger === "update" && session?.username) {
        token.username = session.username;
        await prismadb.user.update({
          where: {
            id: token.id,
          } as any,
          data: {
            username: token.username,
          } as Omit<DatabaseProps, "id">
        })
      } else if (trigger === "update" && session?.email) {
        token.email = session.email;
        await prismadb.user.update({
          where: {
            id: token.id,
          } as any,
          data: {
            email: token.email,
          } as Omit<DatabaseProps, "id">
        })
      }
      if (user) {
        return {
          ...token,
          id: token.id,
          username: user.username,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      // console.log("session callback: ", { token, user, session})
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          email: token.email,
          password: token.password
        },
      };
      // return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
