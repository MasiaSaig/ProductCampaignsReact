import Button from '@/Buttons/Button'

interface ButtonCreateCampaignProps {
  onClick: () => void
}

export function ButtonCreateCampaign({ onClick }: ButtonCreateCampaignProps) {
  return (
    <Button onClick={onClick} className="bg-blue-500 text-white">
      Create new Campaign
    </Button>
  )
}
