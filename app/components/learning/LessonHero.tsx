interface LessonHeroProps {
  courseSlug: string
  moduleTitle: string
  lessonTitle: string
  lessonSubtitle?: string
}

export function LessonHero({
  courseSlug,
  moduleTitle,
  lessonTitle,
  lessonSubtitle,
}: LessonHeroProps) {
  return (
    /* FULL WIDTH BACKGROUND */
    <section
      className="w-full"
      style={{ backgroundColor: "#1b1b1b" }}
    >
      {/* CENTERED CONTENT */}
      <div className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="flex items-center justify-between gap-10">

          {/* LEFT */}
          <div className="flex-1">
            {/* breadcrumb */}
            <div className="mb-3 text-sm text-neutral-400">
              <span className="capitalize">{courseSlug}</span>
              <span className="mx-2">/</span>
              <span>{moduleTitle}</span>
            </div>

            {/* title */}
            <h1 className="mb-3 text-4xl font-semibold leading-tight">
              {lessonTitle}
            </h1>

            {/* subtitle */}
            {lessonSubtitle && (
              <p className="text-lg text-neutral-400 max-w-2xl">
                {lessonSubtitle}
              </p>
            )}
          </div>

          {/* RIGHT CARD */}
          <div className="hidden md:flex">
            <div
              className="flex h-[140px] w-[140px] flex-col items-center justify-center rounded-2xl"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <span className="text-xs uppercase text-neutral-400">
                Lesson
              </span>
              <span className="mt-1 text-lg font-semibold">
                OOP
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
