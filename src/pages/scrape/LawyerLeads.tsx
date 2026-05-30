import IndustryLeadsPage from './IndustryLeadsPage'
import { industryBySlug } from '../../data/industryLeads'

export default function LawyerLeads() {
  return <IndustryLeadsPage config={industryBySlug['lawyer-leads']} />
}
