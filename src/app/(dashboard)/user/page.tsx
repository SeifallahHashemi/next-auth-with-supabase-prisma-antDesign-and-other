import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const UserProfilePage = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div>
            Welcome to your personal profile page
            <h2>userName: {session?.user.username}</h2>
        </div>
    );
};

export default UserProfilePage;