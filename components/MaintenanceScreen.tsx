export default function MaintenanceScreen() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="border-gradient w-full max-w-md rounded-2xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/25 via-orange-400/20 to-amber-400/25 ring-1 ring-amber-400/30">
          <span className="text-2xl">🚧</span>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">
          FOXXY <span className="text-gradient-animated">Sedang Maintenance</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Situs sementara ditutup oleh admin. Coba lagi dalam beberapa saat ya, makasih sudah
          mampir 🙏
        </p>
        <p className="mt-6 font-mono text-[11px] text-slate-600">
          <span className="animate-blink text-amber-400">▌</span> status: maintenance // back soon
        </p>
      </div>
    </div>
  );
}
