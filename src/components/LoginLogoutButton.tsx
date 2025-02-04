"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginButton = () => {
  const { user, loading, signout } = useAuth();
  const router = useRouter();

  if (user && !loading) {
    return (
      <Button
        onClick={() => {
          signout();
        }}
      >
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
