import { StatusBulb } from '@/StatusBulb'
import { KeyWordsList } from '@/KeyWordsList'
import type { campaignCard } from '~/types/CampaignCard'
import { white } from '~/colors'

interface campaignCardProps extends campaignCard {
  click?: (campaign: campaignCard) => void
}

export function CampaignCard({ name, keywords, isActive, click }: campaignCardProps) {
  return (
    <article
      className="flex flex-col p-3 rounded-md shadow-md"
      style={{
        backgroundColor: white,
      }}
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
