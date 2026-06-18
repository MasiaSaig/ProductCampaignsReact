import { createContext, useContext, useState, useEffect } from 'react'
import { Campaign } from '~/types/Capmaign'
import { campaignsMockup } from '~/data-mockup'

interface CampaignContextType {
  campaigns: Campaign[]
  addCampaign: (campaign: Campaign) => void
  removeCampaign: (name: string) => void
  updateCampaign: (name: string, updated: Campaign) => void
}

const CampaignContext = createContext<CampaignContextType | null>(null)

export const CampaignProvider = ({ children }: { children: React.ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  // Load mockup data
  useEffect(() => {
    let ignore = false

    if (!ignore) setCampaigns(campaignsMockup)

    return () => {
      ignore = true
    }
  }, [])

  const addCampaign = (campaign: Campaign): boolean => {
    // must have unique name
    if (campaigns.find((c) => c.name === campaign.name)) return false
    setCampaigns((prev) => [...prev, campaign])
    return true
  }

  const removeCampaign = (name: string) =>
    setCampaigns((prev) => prev.filter((c) => c.name !== name))

  const updateCampaign = (name: string, updated: Campaign) =>
    setCampaigns((prev) => prev.map((c) => (c.name === name ? updated : c)))

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, removeCampaign, updateCampaign }}>
      {children}
    </CampaignContext.Provider>
  )
}

export const useCampaigns = () => {
  const ctx = useContext(CampaignContext)
  if (!ctx) throw new Error('useCampaigns must be used within CampaignProvider')
  return ctx
}
