import { useState, useEffect } from 'react'
import { CampaignCard } from '@/CampaignCard'
import { EmeraldFundBalance } from '@/EmeraldFundBalance'
import { CampaignUpdateModal } from '@/CampaignUpdateModal'
import { CampaignCreateModal } from '@/CampaignCreateModal'
import { TopBar } from '@/TopBar'
import { ButtonCreateCampaign } from '@/Buttons/CreateCampaign'

import { Campaign, emptyCampaign } from '~/types/Campaign'
import type { campaignCard } from '~/types/CampaignCard'

import { useCampaigns } from '~/CampaignContext'
import { emeraldFunds } from '~/data-mockup'

export function AdminPanel() {
  const { campaigns, addCampaign, removeCampaign, updateCampaign } = useCampaigns()
  const [emeraldFundsBalance, setEmeraldFundsBalance] = useState(Number(emeraldFunds))
  const [editingCampaign, setEditingCampaign] = useState<Campaign>({ ...emptyCampaign })
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // show modal after editingCampaign changes
  useEffect(() => {
    if (editingCampaign.id > 0) {
      setShowUpdateModal(true)
    }
  }, [editingCampaign])

  function openUpdateModal(campaign: campaignCard) {
    if (showCreateModal) closeCreateModal()
    const uc = campaigns.find((c) => c.name === campaign.name)
    if (!uc) {
      return
    }
    setEditingCampaign(uc)
  }

  function closeUpdateModal() {
    setShowUpdateModal(false)
    setEditingCampaign({ ...emptyCampaign })
  }

  function openCreateModal() {
    if (showUpdateModal) closeUpdateModal()
    setEditingCampaign({ ...emptyCampaign })
    setShowCreateModal(true)
  }

  function closeCreateModal() {
    setShowCreateModal(false)
    setEditingCampaign({ ...emptyCampaign })
  }

  function createCampaign(newCampaign: Campaign) {
    if (campaigns.find((c) => c.id === newCampaign.id) === undefined) {
      addCampaign(newCampaign)
      closeCreateModal()
      setEmeraldFundsBalance(emeraldFundsBalance - newCampaign.fund)
    } else {
      console.error('Campaign with provided id already exists', newCampaign)
    }
  }

  function tryUpdateCampaign(updatedCampaign: Campaign) {
    updateCampaign(updatedCampaign.id, updatedCampaign)
    closeUpdateModal()
    setEmeraldFundsBalance(emeraldFunds - updatedCampaign.fund)
  }

  function deleteCampaign(campaign: Campaign) {
    if (campaigns.find((c) => c.id === campaign.id) !== undefined) {
      removeCampaign(campaign.id)
      closeUpdateModal()
    } else {
      console.error('Error on campaign deletion', { ...campaign })
    }
  }

  return (
    <section>
      <TopBar />
      <section className="p-8">
        <main className="max-w-5xl m-auto">
          <div className="flex justify-between gap-2 sm:flex-row flex-col">
            <ButtonCreateCampaign onClick={openCreateModal} />
            <EmeraldFundBalance emeraldFund={emeraldFundsBalance} />
          </div>

          <section className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            {campaigns.map((campaign, index) => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                name={campaign.name}
                keywords={campaign.keywords}
                isActive={campaign.status}
                town={campaign.town}
                click={openUpdateModal}
              />
            ))}
          </section>
        </main>

        {showUpdateModal && (
          <CampaignUpdateModal
            exit={closeUpdateModal}
            campaign={editingCampaign}
            emeraldFunds={emeraldFundsBalance}
            onSuccess={(c) => tryUpdateCampaign(c)}
            onDelete={(c) => deleteCampaign(c)}
          />
        )}
        {showCreateModal && (
          <CampaignCreateModal
            exit={closeCreateModal}
            campaign={editingCampaign}
            emeraldFunds={emeraldFundsBalance}
            onSuccess={(c) => createCampaign(c)}
          />
        )}
      </section>
    </section>
  )
}
