import DentistCityPage from './DentistCityPage'
import { cityBySlug } from '../../../data/dentistCities'

export default function DentistMiami() {
  return <DentistCityPage config={cityBySlug('miami')!} />
}
