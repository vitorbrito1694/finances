"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import LoginButton from "@/components/LoginLogoutButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center">
            {/* // TODO - Inserir o Logo */}
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <LoginButton />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
