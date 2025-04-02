"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const LoginButton = () => {
  const { isAuth, signout } = useAuth();
  const router = useRouter();

  useEffect(() => {}, [isAuth]);

  if (isAuth) {
    return (
      <Button
        onClick={() => {
          signout();
        }}
      >
        Sair
      </Button>
    );
  }

  if (!isAuth) {
    return (
      <Button
        variant="outline"
        onClick={() => {
          router.push("/login");
        }}
      >
        Entrar
      </Button>
    );
  }
};

export default LoginButton;
