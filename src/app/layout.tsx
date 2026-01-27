// Root layout - all content is rendered under [locale] layout
// This is a required file for Next.js but the actual layout is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
