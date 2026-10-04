interface Props {
  items: string[]
}

export function IfYouFeelLikeIt({ items }: Props) {
  if (!items.length) return null
  return (
    <section className="print-plain flex-1 min-w-[min(100%,300px)] rounded-card bg-blush border border-blush-border p-7">
      <h2 className="font-display text-2xl mb-3.5">If You Feel Like It</h2>
      <ul className="list-disc pl-5 marker:text-fig flex flex-col gap-2.5 text-[17px] leading-relaxed">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
