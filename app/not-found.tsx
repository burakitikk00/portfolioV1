import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] text-[#ededed] px-6 text-center">
      <span className="font-mono text-xs text-[#dfc3a2] tracking-widest uppercase mb-3">
        404 // PAGE NOT FOUND
      </span>
      <h1 className="text-6xl sm:text-8xl font-black font-display text-white mb-4">
        404
      </h1>
      <p className="text-zinc-400 max-w-md text-sm mb-8">
        The requested page does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full border border-[#dfc3a2] text-[#dfc3a2] text-xs font-semibold tracking-wider uppercase hover:bg-[#dfc3a2] hover:text-black transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
