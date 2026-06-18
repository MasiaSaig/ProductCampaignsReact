import { Modal } from '@/Modal'
import type { Campaign } from '~/types/Capmaign'
import CampaignForm from './Form/CampaignForm'
import type { campaignCard } from '~/types/CampaignCard'

interface CampaignModalInterface {
  exit: () => void
  onSuccess: (updatedCampaign: Campaign) => void
  emeraldFunds: number
  campaign: Campaign
}

export function CampaignUpdateModal({
  exit,
  emeraldFunds,
  campaign,
  onSuccess,
}: CampaignModalInterface) {
  return (
    <Modal title="Update Campaign" exit={() => exit()}>
      <CampaignForm
        campaign={campaign}
        emeraldFunds={emeraldFunds}
        onSuccess={(updatedCampaign: Campaign) => {
          onSuccess(updatedCampaign)
          exit()
        }}
      />
    </Modal>
  )
}
