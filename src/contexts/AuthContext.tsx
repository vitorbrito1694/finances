"use client";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";
import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   login,
//   signup,
//   signout,
//   signInWithGoogle,
//   resetPassword,
// } from "@/lib/auth-actions";
import { supabase } from "@/utils/supabase/client";

interface AuthContextType {
  user: any;
  isAuth: boolean;
  loading: boolean;
  login: (formData: FormData) => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
  resetPassword: (formData: FormData) => Promise<void>;
  signout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

// const supabaseServer = createClient();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuth, setIsAuth] = useState<any>(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user);
      setIsAuth(session?.user ?? null);
      console.log(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function login(formData: FormData) {
    // const supabase = await createClient();

    const dataInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error, data } = await supabase.auth.signInWithPassword(dataInput);

    if (error) {
      console.log(error);
      router.push("/error");
    } else {
      console.log(data);
    }

    // revalidatePath("/dashboard", "page");
    router.push("/dashboard");
  }

  async function signup(formData: FormData) {
    // const supabase = await createClient();

    console.log(formData);

    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const dataInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      options: {
        data: {
          full_name: `${firstName + " " + lastName}`,
          email: formData.get("email") as string,
        },
      },
    };

    const { error, data } = await supabase.auth.signUp(dataInput);

    if (error) {
      console.log(error);
      router.push("/error");
    } else {
      console.log(data);
    }

    // revalidatePath("/", "layout");
    router.push("/");
  }

  async function resetPassword(formData: FormData) {
    // const supabase = await createClient();

    const { error, data } = await supabase.auth.resetPasswordForEmail(
      formData.get("email") as string
    );

    if (error) {
      console.log(error);
      router.push("/error");
    } else {
      console.log(data);
      router.push("/login");
    }
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
      router.push("/error");
    } else {
      router.push("/login");
    }
  }

  async function signInWithGoogle() {
    // const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.log(error);
      router.push("/error");
    }

    if (data.url) {
      router.push(data.url);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        loading,
        login,
        signout,
        signup,
        signInWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
