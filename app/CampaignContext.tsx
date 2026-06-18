import { createContext, useContext, useState, useEffect } from 'react'
import { Campaign } from '~/types/Campaign'
import { campaignsMockup } from '~/data-mockup'

interface CampaignContextType {
  campaigns: Campaign[]
  addCampaign: (campaign: Campaign) => void
  removeCampaign: (id: number) => void
  updateCampaign: (id: number, updated: Campaign) => void
}

const CampaignContext = createContext<CampaignContextType | null>(null)

export const CampaignProvider = ({ children }: { children: React.ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => campaignsMockup)

  const addCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => [...prev, campaign])
  }

  const removeCampaign = (id: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id))
  }

  const updateCampaign = (id: number, updated: Campaign) =>
    setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)))

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
