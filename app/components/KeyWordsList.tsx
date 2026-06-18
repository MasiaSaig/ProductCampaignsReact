interface keywordsProps {
  keywords: Array<String>
}

export function KeyWordsList({ keywords }: keywordsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <strong className="text-sky-300 font-normal" key={index}>
          #{keyword}
        </strong>
      ))}
    </div>
  )
}
