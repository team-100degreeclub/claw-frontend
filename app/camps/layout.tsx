import Leaderboard from "@/components/social/Leaderboard";

export default function CampsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-10 gap-8">
      {/* Left Section (70%): Standard Scrolling Behavior */}
      <section className="col-span-10 lg:col-span-7 space-y-12">
        {children}
      </section>

      {/* Right Section (30%): Fixed/Sticky Behavior */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-28 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
          <Leaderboard />
        </div>
      </aside>
    </div>
  );
}
