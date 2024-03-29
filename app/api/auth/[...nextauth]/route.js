import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_SECRET,
        }),FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
          })
    ],
   callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                // serverless
                await connectToDB();
                //check if user exist
                const userExist = await User.findOne({
                    email: profile.email
                });
                //if not create user
                if(!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "")
                        .toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                
            }
        }
   }
})

export { handler as GET, handler as POST}