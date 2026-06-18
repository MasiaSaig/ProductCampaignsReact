import { Modal } from '@/Modal'
import type { Campaign } from '~/types/Capmaign'

interface CampaignModalInterface {
  title: string
  exit: () => void
  campaign: Campaign
}

export function CampaignModal({ title, exit, campaign }: CampaignModalInterface) {
  return (
    <Modal title={title} exit={() => exit()}>
      <div>nazwa test</div>
    </Modal>
  )
}
