interface ComingSoonPageProps {
  title: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div className="dot-grid-bg min-h-screen text-[#e2e8f0]">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-24">
        <div className="matte-panel w-full max-w-2xl px-8 py-14 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b7280]">
            {title}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Coming soon
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#9ca3af] md:text-base">
            This page is temporarily hidden while we simplify the product.
          </p>
        </div>
      </div>
    </div>
  );
}
