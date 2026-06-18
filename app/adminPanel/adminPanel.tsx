import { useState, useEffect } from 'react'
import { CampaignCard } from '@/CampaignCard'
import { EmeraldFundBalance } from '@/EmeraldFundBalance'
import { CampaignUpdateModal } from '@/CampaignUpdateModal'
import { TopBar } from '@/TopBar'

import { Campaign, emptyCampaign } from '~/types/Campaign'
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
    if (editingCampaign.id > 0) {
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
    console.log('success admin', updatedCampaign)
    updateCampaign(updatedCampaign.id, updatedCampaign)
    closeModal()
    // setEmeraldFundsBalance(emeraldFunds - updatedCampaign.fund)
  }

  function deleteCampaign(campaign: Campaign) {
    if (campaigns.find((c) => c.id === campaign.id) !== undefined) {
      removeCampaign(campaign.id)
      closeModal()
    } else {
      console.error('Error on campaign deletion', { ...campaign })
    }
  }

  return (
    <section>
      <TopBar />
      <section className="p-8">
        <main className="max-w-5xl m-auto">
          <EmeraldFundBalance emeraldFund={emeraldFundsBalance} />

          <section className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
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
            onDelete={(c) => deleteCampaign(c)}
          />
        )}
      </section>
    </section>
  )
}
