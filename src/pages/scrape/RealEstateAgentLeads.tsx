import IndustryLeadsPage from './IndustryLeadsPage'
import { industryBySlug } from '../../data/industryLeads'

export default function RealEstateAgentLeads() {
  return <IndustryLeadsPage config={industryBySlug['real-estate-agent-leads']} />
}
