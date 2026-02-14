export default function HQLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D1F] text-white overflow-x-hidden">
      {/* No Navbar or Container padding here - full immersion */}
      {children}
    </div>
  );
}
