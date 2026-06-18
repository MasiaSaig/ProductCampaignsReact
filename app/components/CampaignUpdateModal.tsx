import { Modal } from '@/Modal'
import type { Campaign } from '~/types/Campaign'
import CampaignForm from './Form/CampaignForm'
import type { campaignCard } from '~/types/CampaignCard'

interface CampaignModalInterface {
  exit: () => void
  onSuccess: (updatedCampaign: Campaign) => void
  onDelete: (campaignToDelete: Campaign) => void
  emeraldFunds: number
  campaign: Campaign
}

export function CampaignUpdateModal({
  exit,
  emeraldFunds,
  campaign,
  onSuccess,
  onDelete,
}: CampaignModalInterface) {
  return (
    <Modal title="Update Campaign" exit={() => exit()}>
      <CampaignForm
        showDeleteButton={true}
        campaign={campaign}
        emeraldFunds={emeraldFunds}
        onSuccess={(updatedCampaign: Campaign) => {
          onSuccess(updatedCampaign)
        }}
        onDelete={(campaignToDelete) => {
          onDelete(campaignToDelete)
        }}
      />
    </Modal>
  )
}
