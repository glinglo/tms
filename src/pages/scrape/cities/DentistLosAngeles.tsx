import DentistCityPage from './DentistCityPage'
import { cityBySlug } from '../../../data/dentistCities'

export default function DentistLosAngeles() {
  return <DentistCityPage config={cityBySlug('los-angeles')!} />
}
