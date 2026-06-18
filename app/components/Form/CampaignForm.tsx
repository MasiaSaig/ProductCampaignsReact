import { useState, useRef, useEffect } from 'react'
import { Campaign, emptyCampaign } from '~/types/Capmaign'

import { FormField } from '@/Form/FormField'
import { bidAmountMin, citiesOptions } from '~/data-mockup'

import '@/Form/CampaignForm.css'

interface CampaignFormProps {
  campaign: Campaign
  emeraldFunds: number
  onSuccess: (updatedCampaign: Campaign) => void
}

interface errorsType {
  name: string
  keywords: string
  bidAmount: string
  fund: string
  radius: string
}
const emptyErrors: errorsType = {
  name: '',
  keywords: '',
  bidAmount: '',
  fund: '',
  radius: '',
}

const errorColor = '#ef4444'
const filledColor = '#a5b4fc'
const emptyColor = '#e5e7eb'
const accentColor = '#6366f1'

export default function CampaignForm({ campaign, emeraldFunds, onSuccess }: CampaignFormProps) {
  const [form, setForm] = useState<Campaign>(campaign)
  const [errors, setErrors] = useState<errorsType>({ ...emptyErrors })
  const [success, setSuccess] = useState(false)
  const [emeraldFundsBalance, setEmeraldFundsBalance] = useState(emeraldFunds)

  const set = (field: string, val: any) => {
    setForm((f) => ({ ...f, [field]: val }))
    if (errors[field as keyof errorsType]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e: errorsType = { ...emptyErrors }
    form.name = form.name.trim()
    if (!form.name) e.name = 'Campaign name is required.'
    if (form.name.length > 255) e.name = 'Campaign name is too long.'

    // if (form.keywords.length === 0) e.keywords = 'At least one keyword is required.'
    // if (form.keywords.length > 10) e.keywords = 'Provided too many key words.'

    form.bidAmount = Number(form.bidAmount)
    if (!form.bidAmount) e.bidAmount = 'Bid amount is required.'
    else if (isNaN(Number(form.bidAmount)) || Number(form.bidAmount) < bidAmountMin)
      e.bidAmount = `Minimum bid amount is ${bidAmountMin}.`

    form.fund = Number(form.fund)
    if (!form.fund) e.fund = 'Campaign fund is required.'
    else if (isNaN(Number(form.fund)) || Number(form.fund) <= 0)
      e.fund = 'Campaign fund must be a positive number.'
    else if (Number(form.fund) > emeraldFundsBalance)
      e.fund = `Insufficient funds. Available: ${emeraldFundsBalance.toFixed(2)} Emeralds.`

    form.radius = Number(form.radius)
    if (!form.radius) e.radius = 'Radius is required.'
    else if (isNaN(Number(form.radius)) || Number(form.radius) <= 0)
      e.radius = 'Radius must be a positive number.'

    return e
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const errorMessages = validate()
    setErrors(errorMessages)

    let containsErrors =
      Object.entries(errorMessages).filter(([key, field]) => field.length > 0).length > 0
    if (!containsErrors) {
      const balance = emeraldFundsBalance - Number(form.fund)
      setEmeraldFundsBalance(balance)
      setSuccess(true)

      onSuccess(form)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="">
      <FormField label="Campaign Name" required error={errors.name}>
        <input
          style={{
            borderColor: errors.name ? errorColor : form.name ? filledColor : emptyColor,
          }}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. Summer Sale 2025"
          onFocus={(e) => !errors.name && (e.target.style.borderColor = accentColor)}
          onBlur={(e) =>
            (e.target.style.borderColor = errors.name
              ? errorColor
              : form.name
                ? filledColor
                : emptyColor)
          }
        />
      </FormField>

      {/* type a head with suggestions KEYWORDS */}

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <FormField
          label="Bid Amount"
          required
          error={errors.bidAmount}
          hint={`Min. ${bidAmountMin}`}
        >
          <div className="relative">
            <input
              type="number"
              className="w-full"
              style={{
                borderColor: errors.bidAmount ? errorColor : emptyColor,
                paddingLeft: '28px',
              }}
              value={form.bidAmount}
              onChange={(e) => set('bidAmount', e.target.value)}
              min={bidAmountMin}
              placeholder={String(bidAmountMin)}
              onFocus={(e) => !errors.bidAmount && (e.target.style.borderColor = accentColor)}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.bidAmount ? errorColor : emptyColor)
              }
            />
            <span className="absolute left-3 top-[50%] -translate-y-[50%] text-[0.9rem] text-gray-400 pointer-events-none">
              $
            </span>
          </div>
        </FormField>

        <FormField
          label="Campaign Fund"
          required
          error={errors.fund}
          hint="Deducted from Emerald balance"
        >
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              className="w-full"
              style={{
                paddingLeft: '28px',
                borderColor: errors.fund ? errorColor : emptyColor,
              }}
              value={form.fund}
              onChange={(e) => set('fund', e.target.value)}
              min={1}
              max={emeraldFundsBalance}
              placeholder="0"
              onFocus={(e) => !errors.fund && (e.target.style.borderColor = accentColor)}
              onBlur={(e) => (e.target.style.borderColor = errors.fund ? errorColor : emptyColor)}
            />
            <span className="absolute left-3 top-[50%] -translate-y-[50%] text-[0.9rem] text-gray-400 pointer-events-none">
              $
            </span>
          </div>
        </FormField>
      </div>

      <FormField label="Status" required>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[true, false].map((s, index) => (
            <button
              key={index}
              type="button"
              onClick={() => set('status', s)}
              className="flex justify-center items-center gap-3 flex-1 p-3 rounded-md text-sm font-semibold transition"
              style={{
                border: form.status === s ? '2px solid transparent' : '1.5px solid #e5e7eb',
                background: form.status === s ? (s === true ? accentColor : '#374151') : '#f9fafb',
                color: form.status === s ? '#fff' : '#6b7280',
              }}
            >
              <span
                className="inline-block size-2 rounded-[50%]"
                style={{
                  background:
                    form.status === s ? (s === true ? filledColor : '#9ca3af') : '#d1d5db',
                }}
              />
              {s === true ? 'Active' : 'Inactive'}
            </button>
          ))}
        </div>
      </FormField>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <FormField label="Town">
          <select
            className="cursor-pointer appearance-none pr-[38px]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
            value={form.town}
            onChange={(e) => set('town', e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = accentColor)}
            onBlur={(e) => (e.target.style.borderColor = emptyColor)}
          >
            {citiesOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Radius (km)" required error={errors.radius}>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              className="w-full"
              style={{
                paddingRight: '40px',
                borderColor: errors.radius ? errorColor : emptyColor,
              }}
              value={form.radius}
              onChange={(e) => set('radius', e.target.value)}
              min={1}
              max={9999}
              placeholder="25"
              onFocus={(e) => !errors.radius && (e.target.style.borderColor = accentColor)}
              onBlur={(e) => (e.target.style.borderColor = errors.radius ? errorColor : emptyColor)}
            />
            <span className="absolute right-3 top-[50%] -translate-y-[50%] text-[0.9rem] text-gray-400 pointer-events-none">
              km
            </span>
          </div>
        </FormField>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-[20px]">
        <div className="">
          <p className="w-full font-semibold text-xs text-gray-400">EMERALD BALANCE: </p>
          <p className="w-full text-2xl font-extrabold" style={{ color: accentColor }}>
            {emeraldFundsBalance.toFixed(2)}$
          </p>
        </div>
        <button
          type="submit"
          className="max-w-[300px] p-3 ml-auto flex-2 border-none rounded-[10px] font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
          }}
        >
          Update Campaign
        </button>
      </div>
    </form>
  )
}
