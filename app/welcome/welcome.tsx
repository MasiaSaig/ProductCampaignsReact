import type { campaignCard } from '~/types/CampaignCard'
import { CampaignCard } from '@/CampaignCard'
import { TopBar } from '@/TopBar'

import { useCampaigns } from '~/CampaignContext'

export function Welcome() {
  const { campaigns } = useCampaigns()

  return (
    <section>
      <TopBar />
      <main className="max-w-5xl m-auto sm:px-4 px-2">
        <h1 className="my-4 mx-8 text-center text-2xl font-bold">Campaigns of products</h1>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {campaigns
            .filter((c) => c.status)
            .map((campaign, index) => (
              <CampaignCard
                showStatusBulb={false}
                showTown={true}
                id={campaign.id}
                key={index}
                name={campaign.name}
                keywords={campaign.keywords}
                isActive={campaign.status}
                town={campaign.town}
              />
            ))}
        </section>
      </main>
    </section>
  )
}
