import IndustryLeadsPage from './IndustryLeadsPage'
import { industryBySlug } from '../../data/industryLeads'

export default function DentistLeads() {
  return <IndustryLeadsPage config={industryBySlug['dentist-leads']} />
}
