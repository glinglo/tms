import DentistCityPage from './DentistCityPage'
import { cityBySlug } from '../../../data/dentistCities'

export default function DentistHouston() {
  return <DentistCityPage config={cityBySlug('houston')!} />
}
