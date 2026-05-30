import IndustryLeadsPage from './IndustryLeadsPage'
import { industryBySlug } from '../../data/industryLeads'

export default function PlumberLeads() {
  return <IndustryLeadsPage config={industryBySlug['plumber-leads']} />
}
