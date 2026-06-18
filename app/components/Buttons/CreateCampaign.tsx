import { Button } from './Button'

interface ButtonCreateCampaignProps {
  onClick: () => void
}

export function ButtonCreateCampaign({ onClick }: ButtonCreateCampaignProps) {
  return <Button onClick={onClick}>Create new Campaign</Button>
}
