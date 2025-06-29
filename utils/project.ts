import Badge from '@/utils/badge'

export default interface Project {
  title: string
  link: string
  image: string
  alt: string,
  desc: string
  badges: Badge[]
}