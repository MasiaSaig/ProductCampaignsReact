import { accent } from '~/colors'

export function EmeraldFundBalance({ emeraldFund }: { emeraldFund: number }) {
  return (
    <div>
      <p className="w-full font-semibold text-xs text-gray-400">EMERALD BALANCE: </p>
      <p className="w-full text-2xl font-extrabold" style={{ color: accent }}>
        {emeraldFund.toFixed(2)}$
      </p>
    </div>
  )
}
