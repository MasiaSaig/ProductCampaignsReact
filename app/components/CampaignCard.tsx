import { StatusBulb } from '@/StatusBulb'
import { KeyWordsList } from '@/KeyWordsList'
import type { campaignCard } from '~/types/CampaignCard'

interface campaignCardProps extends campaignCard {
  click?: (campaign: campaignCard) => void
}

export function CampaignCard({ name, keywords, isActive, click }: campaignCardProps) {
  return (
    <article
      className="flex flex-col border border-indigo-500 p-2 rounded-md"
      onClick={() => click && click({ name, keywords, isActive })}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">{name}</h3>
        <StatusBulb isActive={isActive} />
      </div>
      <KeyWordsList keywords={keywords} />
    </article>
  )
}
