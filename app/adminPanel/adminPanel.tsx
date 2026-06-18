import { useState, useEffect } from 'react'
import { CampaignCard } from '@/CampaignCard'
import { Campaign } from '~/types/Capmaign'
import { CampaignModal } from '@/CampaignModal'
import type { campaignCard } from '~/types/CampaignCard'

import { useCampaigns } from '~/CampaignContext'

export function AdminPanel() {
  const { campaigns, addCampaign } = useCampaigns()
  const emptyCampaign = {
    name: '',
    keywords: [],
    bidAmount: 0,
    found: 0,
    status: false,
    radius: 0,
    town: '',
  }
  const [editingCampaign, setEditingCampaign] = useState<Campaign>(emptyCampaign)
  const [showCampaignUpdateDialog, setShowCampaignUpdateDialog] = useState(false)

  // show modal after editingCampaign changes
  useEffect(() => {
    console.log('editingCampaign', editingCampaign)
    if (editingCampaign.name.length) {
      setShowCampaignUpdateDialog(true)
    }
  }, [editingCampaign])

  function openModal(campaign: campaignCard) {
    const uc = campaigns.find((c) => c.name === campaign.name)
    if (!uc) {
      return
    }
    setEditingCampaign(uc)
  }

  function closeModal() {
    setShowCampaignUpdateDialog(false)
    setEditingCampaign(emptyCampaign)
  }

  return (
    <section className="p-8">
      <main className="max-w-5xl m-auto">
        <p>Emerald account funds</p>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              name={campaign.name}
              keywords={campaign.keywords}
              isActive={campaign.status}
              click={openModal}
            />
          ))}
        </section>
      </main>

      {showCampaignUpdateDialog && (
        <CampaignModal title="Edit Campaign" exit={closeModal} campaign={editingCampaign} />
      )}
    </section>
  )
}
