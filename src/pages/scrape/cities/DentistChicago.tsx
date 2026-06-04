import DentistCityPage from './DentistCityPage'
import { cityBySlug } from '../../../data/dentistCities'

export default function DentistChicago() {
  return <DentistCityPage config={cityBySlug('chicago')!} />
}
