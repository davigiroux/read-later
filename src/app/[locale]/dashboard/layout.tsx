"use client";

import { AppShell } from "@/components/layout";
import { AddLinkModalProvider } from "@/contexts/add-link-modal-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AddLinkModalProvider>
      <AppShell>{children}</AppShell>
    </AddLinkModalProvider>
  );
}
