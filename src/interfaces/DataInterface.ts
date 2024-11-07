export interface MenuItem {
  label: string
  url: string
}

export interface Footer {
  label: string
  items: MenuItem[]
}

export interface Menu {
  logo: string
  header: MenuItem[]
  footer: Footer[]
}

export interface Links {
  label: string
  url: string
}

export interface Subscription {
  'email-placeholder': string
  'submit-text': string
  'agreement-text'?: string
}

export interface Contacts {
  whatsapp: string
  phone: string
  email: string
  instagram: string
  facebook: string
  youtube: string
  linkedin: string
  links: Links[]
  subscription: Subscription
}

export interface Ticker {
  text: string
  color: string
}

export interface Image {
  url: string
  shape: string
}

export interface Stamp {
  word: string
  type: string
  position: string
}

export interface SectionItem {
  title: string
  text: string
  accent: string
  date: string
  duration: number
  'browse-text'?: string
  size: string
  tags: string[]
  img: Image
  stamp: Stamp
}

export interface Section {
  items: SectionItem[]
  ticker: Ticker
}

export interface ProposalsItem {
  background: string
  author: {
    img: string
    name: string
    position: string
  }
  text: string
  tags: string[]
  date_from: string
  date_to: string
  time: string
}

export interface Proposals {
  title: string
  'browse-all-text': string
  items: ProposalsItem[]
  ticker: Ticker
}

export interface SubscriptionSection {
  title: string
  text: string
  'email-placeholder': string
  'submit-text': string
  'agreement-text'?: string
  ticker: Ticker
}

export interface Sections {
  main: Section
  content: Section
  proposals: Proposals
  subscription: SubscriptionSection
}

export interface Database {
  menu: Menu
  sections: Sections
  contacts: Contacts
}
