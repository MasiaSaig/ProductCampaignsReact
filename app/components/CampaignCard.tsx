import { StatusBulb } from '@/StatusBulb'
import { KeyWordsList } from '@/KeyWordsList'
import type { campaignCard } from '~/types/CampaignCard'
import { white } from '~/colors'

interface campaignCardProps extends campaignCard {
  click?: (campaign: campaignCard) => void
  showStatusBulb?: boolean
  showTown?: boolean
}

export function CampaignCard({
  id,
  name,
  keywords,
  isActive,
  town,
  click,
  showStatusBulb = true,
  showTown = false,
}: campaignCardProps) {
  return (
    <article
      className="flex flex-col p-3 rounded-md shadow-m transition-all border border-transparent hover:border-[#ffb900]"
      style={{
        backgroundColor: white,
      }}
      onClick={() => click && click({ id, name, keywords, isActive, town })}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl line-clamp-2" title={name}>
          {name}
        </h3>
        {showStatusBulb && <StatusBulb isActive={isActive} />}
        {showTown && town && <span className="bg-gray-300 rounded-lg px-[4px]">{town}</span>}
      </div>
      <KeyWordsList keywords={keywords} />
    </article>
  )
}
