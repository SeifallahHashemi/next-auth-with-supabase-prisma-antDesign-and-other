"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "antd";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <Button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
          Sign out
        </Button>
      ) : (
        <Link href={"/sign-in"}>Sign in</Link>
      )}
    </div>
  );
};

export default Header;