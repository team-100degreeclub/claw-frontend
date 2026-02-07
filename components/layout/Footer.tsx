export default function Footer() {
  const links = ["About C.L.A.W.","Contact", "Privacy", "Terms"];
  
  return (
    <footer className="mt-20 border-t border-zinc-900 bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="gap-12 mb-12 flex justify-between">
          <div className="col-span-2">
             <h2 className="text-4xl font-black tracking-tighter text-white mb-4">C.L.A.W.</h2>
             <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
               A global functional training revolution led by Special Forces veterans. Conquer Land, Air, and Water.
             </p>
          </div>
          <div className="flex flex-col items-end">
          {links.map(link => (
            <a key={link} href="#" className="text-xs font-bold tracking-widest text-zinc-400 hover:text-white p-2">
              {link}
            </a>
          ))}
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-zinc-900 pt-8 text-[10px] font-bold tracking-widest text-zinc-600">
          <p>© 2026 C.L.A.W. GLOBAL(Beta) - ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <span>Instagram</span>
            <span>YouTube</span>
            <span>X (Twitter)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}