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
}
export interface Subscription {
  'email-placeholder': string
  'submit-text': string
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
  subscription: Subscription[]
}

export interface Ticker {
  text: string
  color: string
}

export interface Items {
  title: string
  text: string
  accent: string
  date: string
  duration: number
  'browse-text': string
  size: string
  tags: string[]
  img: {
    url: string
    shape: string
  }
  stamp: {
    word: string
    type: string
    position: string
  }
}

export interface Main {
  items: Items[]
  ticker: Ticker[]
}
// что то я уже устал это типизировать Э)
