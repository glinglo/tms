import IndustryLeadsPage from './IndustryLeadsPage'
import { industryBySlug } from '../../data/industryLeads'

export default function RestaurantLeads() {
  return <IndustryLeadsPage config={industryBySlug['restaurant-leads']} />
}
