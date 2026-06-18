export class Campaign {
  name: string
  keywords: Array<string>
  bidAmount: Number
  found: number // pln or euro I guess
  status: boolean
  radius: number // km
  town: string
  constructor(
    name: string,
    keywords: Array<string>,
    bidAmount: number,
    found: number,
    status: boolean = true,
    radius: number = 5,
    town: string = ''
  ) {
    this.name = name
    this.keywords = keywords
    this.bidAmount = bidAmount
    this.found = found
    this.status = status
    this.radius = radius
    this.town = town
  }
}
