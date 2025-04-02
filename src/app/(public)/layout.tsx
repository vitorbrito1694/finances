"use client";

import Image from "next/image";
import Link from "next/link";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LoginButton from "@/components/login-logout-button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth, loading } = useAuth();
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-center">
          <div className="container flex justify-between gap-2 items-center">
            <div>
              <Image
                src={"/assets/icons/vb-logo.svg"}
                alt="Logo Vitor Brito"
                width={40}
                height={40}
              />
            </div>
            <div className="gap-2 flex items-center">
              {isAuth && !loading && (
                <Button variant={"ghost"} asChild>
                  <Link href="/dashboard">Ir para meu Dashboard</Link>
                </Button>
              )}
              {loading && <Skeleton className="h-9 w-14 rounded-md" />}
              {!loading && <LoginButton />}
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
