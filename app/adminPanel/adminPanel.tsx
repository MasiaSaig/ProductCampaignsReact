import { useState, useEffect } from 'react'
import { CampaignCard } from '@/CampaignCard'
import { Campaign, emptyCampaign } from '~/types/Capmaign'
import { CampaignUpdateModal } from '@/CampaignUpdateModal'
import type { campaignCard } from '~/types/CampaignCard'

import { useCampaigns } from '~/CampaignContext'
import { emeraldFunds } from '~/data-mockup'

export function AdminPanel() {
  const { campaigns, addCampaign, removeCampaign, updateCampaign } = useCampaigns()
  const [emeraldFundsBalance, setEmeraldFundsBalance] = useState(Number(emeraldFunds))
  const [editingCampaign, setEditingCampaign] = useState<Campaign>({ ...emptyCampaign })
  const [showCampaignUpdateDialog, setShowCampaignUpdateDialog] = useState(false)

  // show modal after editingCampaign changes
  useEffect(() => {
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
    setEditingCampaign({ ...emptyCampaign })
  }

  function updateDataAfterSuccess(updatedCampaign: Campaign) {
    updateCampaign(updatedCampaign.name, updatedCampaign)
    // setEmeraldFundsBalance(emeraldFunds - updatedCampaign.fund)
  }

  return (
    <section className="p-8">
      <main className="max-w-5xl m-auto">
        <p>Emerald account funds: {emeraldFundsBalance}</p>

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
        <CampaignUpdateModal
          exit={closeModal}
          campaign={editingCampaign}
          emeraldFunds={emeraldFundsBalance}
          onSuccess={(c) => updateDataAfterSuccess(c)}
        />
      )}
    </section>
  )
}
