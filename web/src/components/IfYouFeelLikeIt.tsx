interface Props {
  items: string[]
}

export function IfYouFeelLikeIt({ items }: Props) {
  if (!items.length) return null

  return (
    <div className="ifyfli-section">
      <h3 className="font-serif text-base font-semibold text-orange-900 mb-3">
        If You Feel Like It
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[15px] text-orange-900 leading-snug">
            <span className="mt-1.5 flex-shrink-0 text-orange-400">✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
