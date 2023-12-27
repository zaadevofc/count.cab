import { signIn } from "next-auth/react"

const Index = () => {
    return (
        <>
            <div className="p-28">
                <h1 onClick={() => signIn('discord')}>Login</h1>
            </div>
        </>
    )
}

export default Index