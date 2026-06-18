import type { campaignCard } from '~/types/CampaignCard'
import { CampaignCard } from '@/CampaignCard'
import { TopBar } from '@/TopBar'

import { useCampaigns } from '~/CampaignContext'
import { emeraldFunds } from '~/data-mockup'

export function Welcome() {
  const { campaigns, addCampaign, removeCampaign, updateCampaign } = useCampaigns()

  return (
    <section>
      <TopBar />
      <main className="max-w-5xl m-auto">
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              name={campaign.name}
              keywords={campaign.keywords}
              isActive={campaign.status}
            />
          ))}
        </section>
      </main>
    </section>
  )
}
