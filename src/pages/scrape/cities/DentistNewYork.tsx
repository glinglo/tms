import DentistCityPage from './DentistCityPage'
import { cityBySlug } from '../../../data/dentistCities'

export default function DentistNewYork() {
  return <DentistCityPage config={cityBySlug('new-york')!} />
}
