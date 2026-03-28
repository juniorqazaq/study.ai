export function TestimonialsMasonry() {
  return (
    <section className="border-t border-[#262626] bg-[#111111] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b6b6b]">
            Testimonials
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Students use Study.ai to make learning feel clearer
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#9b9b9b]">
            Notes, quizzes, flashcards, and study modes stay in one focused workflow instead of being scattered across tools.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            'It turns my lecture notes into something I can actually revise from.',
            'The layout feels calmer now and it is easier to stay focused for longer sessions.',
            'Flashcards and notes finally feel connected instead of separate tools.',
          ].map((quote, index) => (
            <article key={index} className="rounded-[24px] border border-[#262626] bg-[#171717] p-6">
              <p className="text-base leading-8 text-[#d4d4d8]">&quot;{quote}&quot;</p>
              <div className="mt-6 text-sm font-medium text-white">Study.ai user</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
