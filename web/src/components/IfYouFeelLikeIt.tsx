interface Props {
  items: string[]
}

export function IfYouFeelLikeIt({ items }: Props) {
  if (!items.length) return null

  return (
    <div className="ifyfli-section">
      <h3 className="font-serif text-base font-semibold mb-3" style={{ color: '#3D2817' }}>
        If You Feel Like It
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[15px] leading-snug" style={{ color: '#6B4226' }}>
            <span className="mt-1.5 flex-shrink-0" style={{ color: '#B8793A' }}>✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
