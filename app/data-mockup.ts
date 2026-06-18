import { Campaign } from './types/Capmaign'

export const emeraldFunds = 9999

export const citiesOptions = ['Warsaw', 'Cracow', 'Gdansk', 'Wroclaw', 'Poznan', 'Lodz', 'Katowice']

export const bidAmountMin = 1.0

export const keywordsOptions = [
  'summer',
  'winter',
  'sale',
  'discount',
  'promo',
  'deals',
  'spring',
  'fashion',
  'new',
  'blackfriday',
  'deals',
  'sale',
  'tech',
  'gadgets',
  'electronics',
]

export const campaignsMockup: Campaign[] = [
  new Campaign('Summer Sale', ['summer', 'sale', 'discount'], 2.5, 1000, true, 10, 'Warsaw'),
  new Campaign('Winter Promo', ['winter', 'promo', 'deals'], 3.0, 1500, true, 15, 'Cracow'),
  new Campaign('Spring Collection', ['spring', 'fashion', 'new'], 1.75, 800, false, 8, 'Gdansk'),
  new Campaign('Black Friday', ['blackfriday', 'deals', 'sale'], 5.0, 5000, true, 20, 'Wroclaw'),
  new Campaign('Local Services', ['tech', 'new', 'fashion'], 1.5, 600, true, 5),
  new Campaign('Tech Gadgets', ['tech', 'gadgets', 'electronics'], 4.0, 2000, false, 12, 'Lodz'),
]
