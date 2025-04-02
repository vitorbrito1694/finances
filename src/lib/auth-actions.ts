"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const dataInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(dataInput);

  if (error) {
    console.log(error);
    redirect("/error");
  } else {
    console.log(data);
  }

  revalidatePath("/dashboard", "page");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

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
    redirect("/error");
  } else {
    console.log(data);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log({ error });
    redirect("/error");
  } else {
    redirect("/login");
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();
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
    redirect("/error");
  }

  redirect(data.url);
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string
  );

  if (error) {
    console.log(error);
    redirect("/error");
  } else {
    console.log(data);
    redirect("/login");
  }
}
