import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Gradient blobs */}
      <div className="gradient-blob gradient-blob-blue w-[600px] h-[600px] -top-64 -right-64 absolute" />
      <div className="gradient-blob gradient-blob-purple w-[400px] h-[400px] bottom-0 -left-32 absolute" />

      <MarketingNavbar />

      <main className="flex-1 relative z-10">
        {children}
      </main>

      <div className="relative z-10">
        <MarketingFooter />
      </div>
    </div>
  );
}
