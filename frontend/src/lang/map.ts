import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_PICK_UP_LOCATION: 'Choisir ce lieu',
    SELECT_DROP_OFF_LOCATION: 'Choisir comme lieu de restitution',
    OPEN_IN_GOOGLE_MAPS: 'Ouvrir dans Google Maps',
  },
  en: {
    SELECT_PICK_UP_LOCATION: 'Select Location',
    SELECT_DROP_OFF_LOCATION: 'Set as Drop-off Location',
    OPEN_IN_GOOGLE_MAPS: 'Open in Google Maps',
  },
  es: {
    SELECT_PICK_UP_LOCATION: 'Seleccionar ubicación',
    SELECT_DROP_OFF_LOCATION: 'Establecer como ubicación de entrega',
    OPEN_IN_GOOGLE_MAPS: 'Abrir en Google Maps',
  },
})

langHelper.setLanguage(strings)
export { strings }
