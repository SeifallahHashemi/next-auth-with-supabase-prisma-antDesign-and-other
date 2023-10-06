'use client'
import React, {useEffect} from 'react';
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const AdminPage = () => {
    const router = useRouter()
    const {data: session, status} = useSession();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (status === "unauthenticated" || status !== "authenticated") {
                router.back()
            }
        }, 2000)
        return () => clearTimeout(timer);
    }, [status, router]);
    return (
        <div>
            <h1>{session?.user?.email}</h1>
            <h2>{session?.user?.username}</h2>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

export default AdminPage;