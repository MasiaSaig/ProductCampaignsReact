export class Campaign {
  id: number
  name: string
  keywords: Array<string>
  bidAmount: number
  fund: number // pln or euro I guess
  status: boolean
  radius: number // km
  town: string
  constructor(
    id: number,
    name: string,
    keywords: Array<string>,
    bidAmount: number,
    found: number,
    status: boolean = true,
    radius: number = 5,
    town: string = ''
  ) {
    this.id = id
    this.name = name
    this.keywords = keywords
    this.bidAmount = bidAmount
    this.fund = found
    this.status = status
    this.radius = radius
    this.town = town
  }
}

export const emptyCampaign = {
  id: 0,
  name: '',
  keywords: [],
  bidAmount: 0,
  fund: 0,
  status: false,
  radius: 0,
  town: '',
}
