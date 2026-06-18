import { Modal } from '@/Modal'
import type { Campaign } from '~/types/Campaign'
import CampaignForm from './Form/CampaignForm'
import type { campaignCard } from '~/types/CampaignCard'

interface CampaignModalInterface {
  exit: () => void
  onSuccess: (updatedCampaign: Campaign) => void
  emeraldFunds: number
  campaign: Campaign
}

export function CampaignCreateModal({
  exit,
  emeraldFunds,
  campaign,
  onSuccess,
}: CampaignModalInterface) {
  return (
    <Modal title="Create Campaign" exit={() => exit()}>
      <CampaignForm
        showEmeraldBalance={true}
        campaign={campaign}
        emeraldFunds={emeraldFunds}
        onSuccess={(updatedCampaign: Campaign) => {
          console.log('successs modal', { ...updatedCampaign })
          onSuccess(updatedCampaign)
        }}
      />
    </Modal>
  )
}
