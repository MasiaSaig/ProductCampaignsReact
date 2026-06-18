import { useState, useRef, useEffect } from 'react'
import { Campaign, emptyCampaign } from '~/types/Campaign'
import { EmeraldFundBalance } from '@/EmeraldFundBalance'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@/Buttons/Button'
import * as color from '~/colors'

import { FormField } from '@/Form/FormField'
import { bidAmountMin, citiesOptions, keywordsOptions } from '~/data-mockup'
import { useCampaigns } from '~/CampaignContext'

import '@/Form/CampaignForm.css'

interface CampaignFormProps {
  showEmeraldBalance?: boolean
  showDeleteButton?: boolean
  campaign: Campaign
  emeraldFunds: number
  onSuccess: (updatedCampaign: Campaign) => void
  onDelete?: (campaignToDelete: Campaign) => void
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

export default function CampaignForm({
  showEmeraldBalance = false,
  showDeleteButton = false,
  campaign,
  emeraldFunds,
  onSuccess,
  onDelete,
}: CampaignFormProps) {
  const { campaigns } = useCampaigns()
  const [loadedName, setLoadedName] = useState<string>(campaign.name)
  const [form, setForm] = useState<Campaign>(campaign)
  const [errors, setErrors] = useState<errorsType>({ ...emptyErrors })
  const [emeraldFundsBalance, setEmeraldFundsBalance] = useState(emeraldFunds)

  function set(field: string, val: any) {
    setForm((f) => ({ ...f, [field]: val }))
    if (errors[field as keyof errorsType]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  function changeKeyWords(_event: any, value: any) {
    set('keywords', value)
  }

  const validate = () => {
    const e: errorsType = { ...emptyErrors }
    form.name = form.name.trim()
    if (!form.name) e.name = 'Campaign name is required.'
    if (form.name.length > 255) e.name = 'Campaign name is too long.'
    if (loadedName !== form.name && campaigns.find((c) => c.name === form.name))
      e.name = 'Campaign name is already in use.'

    if (form.keywords.length === 0) e.keywords = 'At least one keyword is required.'
    if (form.keywords.length > 10) e.keywords = 'Provided too many key words.'

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

  function handleSubmit(e: any) {
    e.preventDefault()
    const errorMessages = validate()
    setErrors(errorMessages)

    let containsErrors =
      Object.entries(errorMessages).filter(([key, field]) => field.length > 0).length > 0
    if (!containsErrors) {
      const balance = emeraldFundsBalance - Number(form.fund)
      setEmeraldFundsBalance(balance)
      // set id if creating
      if (form.id <= 0) {
        // set immedately, dont wait for state to update
        //set('id', Math.max(...campaigns.map((c) => c.id)) + 1)
        onSuccess({ ...form, id: Math.max(...campaigns.map((c) => c.id)) + 1 })
      } else {
        onSuccess(form)
      }
    }
  }

  const deleteCampaign = () => {
    onDelete && onDelete(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormField label="Campaign Name" required error={errors.name}>
        <input
          style={{
            borderColor: errors.name ? color.error : form.name ? color.accentBlunt : color.bright,
          }}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. Summer Sale 2025"
          onBlur={(e) =>
            (e.target.style.borderColor = errors.name
              ? color.error
              : form.name
                ? color.accentBlunt
                : color.bright)
          }
        />
      </FormField>

      {/* type a head with suggestions KEYWORDS */}
      <FormField
        label="Key words"
        required
        error={errors.keywords}
        hint={'At Least 1 and at most 10.'}
      >
        <div className="relative">
          <Autocomplete
            multiple
            disablePortal
            limitTags={10}
            options={keywordsOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Key word..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: color.accent,
                    },
                  },
                }}
              />
            )}
            value={form.keywords}
            onChange={changeKeyWords}
            getOptionLabel={(keyword) => keyword}
            isOptionEqualToValue={(option, keyword) => option === keyword}
            className="mb-2"
          />
        </div>
      </FormField>

      <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
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
                borderColor: errors.bidAmount ? color.error : color.bright,
                paddingLeft: '28px',
              }}
              value={form.bidAmount}
              onChange={(e) => set('bidAmount', e.target.value)}
              min={bidAmountMin}
              placeholder={String(bidAmountMin)}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.bidAmount ? color.error : color.bright)
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
                borderColor: errors.fund ? color.error : color.bright,
              }}
              value={form.fund}
              onChange={(e) => set('fund', e.target.value)}
              min={1}
              max={emeraldFundsBalance}
              placeholder="0"
              onBlur={(e) =>
                (e.target.style.borderColor = errors.fund ? color.error : color.bright)
              }
            />
            <span className="absolute left-3 top-[50%] -translate-y-[50%] text-[0.9rem] text-gray-400 pointer-events-none">
              $
            </span>
          </div>
        </FormField>
      </div>

      <FormField label="Status" required>
        <div className="flex gap-[10px] flex-col sm:flex-row">
          {[true, false].map((s, index) => (
            <button
              key={index}
              type="button"
              onClick={() => set('status', s)}
              className="flex justify-center items-center gap-3 flex-1 p-3 rounded-md text-sm font-semibold transition"
              style={{
                border: form.status === s ? '2px solid transparent' : '1.5px solid #e5e7eb',
                background:
                  form.status === s ? (s === true ? '#00AF00' : color.disabledAccent) : '#f9fafb',
                color: form.status === s ? '#fff' : color.disabled,
              }}
            >
              <span
                className="inline-block size-2 rounded-[50%]"
                style={{
                  background: form.status === s ? (s === true ? '#00D700' : '#9ca3af') : '#d1d5db',
                }}
              />
              {s === true ? 'Active' : 'Inactive'}
            </button>
          ))}
        </div>
      </FormField>

      <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
        <FormField label="Town">
          <select
            className="cursor-pointer appearance-none pr-[38px]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              borderColor: errors.radius ? color.error : color.bright,
            }}
            value={form.town}
            onChange={(e) => set('town', e.target.value)}
            onBlur={(e) => (e.target.style.borderColor = color.bright)}
          >
            <option key={'Any town'} value={'Any town'}>
              Any town
            </option>
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
                borderColor: errors.radius ? color.error : color.bright,
              }}
              value={form.radius}
              onChange={(e) => set('radius', e.target.value)}
              min={1}
              max={9999}
              placeholder="25"
              onBlur={(e) =>
                (e.target.style.borderColor = errors.radius ? color.error : color.bright)
              }
            />
            <span className="absolute right-3 top-[50%] -translate-y-[50%] text-[0.9rem] text-gray-400 pointer-events-none">
              km
            </span>
          </div>
        </FormField>
      </div>

      {/* Actions */}
      <div className="flex mt-[20px] justify-between flex-col gap-2 sm:gap-4 sm:flex-row">
        {showEmeraldBalance && <EmeraldFundBalance emeraldFund={emeraldFundsBalance} />}
        {showDeleteButton && (
          <Button
            className="sm:max-w-[200px] max-w-full sm:flex-1 p-3 flex-1 border-none rounded-[10px] font-bold text-white"
            style={{
              background: '#C70000',
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
            }}
            onClick={deleteCampaign}
          >
            Delete Campaign
          </Button>
        )}
        <Button
          type="submit"
          className="sm:max-w-[250px] max-w-full sm:flex-1 p-3 flex-2 border-none rounded-[10px] font-bold text-white"
          style={{
            background: '#2B7FFF',
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
          }}
        >
          {form.id > 0 ? 'Update Campaign' : 'Create Campaign'}
        </Button>
      </div>
    </form>
  )
}
