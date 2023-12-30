import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "~/prisma";

export const auth: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        DiscordProvider({
            clientId: process.env.AUTH_DISCORD_ID as string,
            clientSecret: process.env.AUTH_DISCORD_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        async signIn(params: any) {
            let upsert = await prisma.user.upsert({
                create: {
                    id: params.user.id,
                    username: params.user.name,
                    email: params.user.email,
                    picture: params.user.image,
                },
                update: {
                    id: params.user.id,
                    username: params.user.name,
                    email: params.user.email,
                    picture: params.user.image,
                },
                where: { email: params.user.email }
            })
            return params
        },
        session(session: any) {
            return session
        },
        redirect(url: any) {
            return url.baseUrl + '/dash';
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(auth as any)