import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
 
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({user, account}){
      // Add user to your database if not exists
      //...
      console.log(user)

      if(account.provider === "google"){
        try {
          const res = await axios.post(`${process.env.API_URL}/users/register`, { 
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          })

          if(res.statusCode === 200 || res.statusCode === 201){
            return user
          }
        } catch (error) {
          console.log("ERROR WHEN REGISTER: " + error)
        }
      }
      return user;
    }
  }
});