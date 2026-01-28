export function LessonRenderer({ lesson }: { lesson: any }) {
  return (
    <div className="space-y-6">
      {lesson.blocks.map((block: any, i: number) => {
        switch (block.type) {
          case "text":
            return (
              <p key={i} className="text-lg leading-relaxed">
                {block.content}
              </p>
            )

          case "list":
            return (
              <ul key={i} className="list-disc pl-6 text-neutral-300">
                {block.items.map((item: string, j: number) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )

          case "example":
            return (
              <div
                key={i}
                className="rounded-lg bg-neutral-800 p-4 text-neutral-200"
              >
                {block.content}
              </div>
            )

          case "code-preview":
            return (
              <pre
                key={i}
                className="rounded-lg bg-black p-4 text-sm text-green-400"
              >
                {block.code}
              </pre>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
