import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION_HEADING: 'Nouveau lieu',
    LOCATION_NAME: 'Lieu',
    INVALID_LOCATION: 'Ce lieu existe déjà.',
    LOCATION_CREATED: 'Lieu créé avec succès.',
    COUNTRY: 'Pays',
    PARKING_SPOTS: 'Places de parking',
    PARENT_LOCATION: 'Lieu Parent',
    MAP_LINK: 'Lien Google Maps',
    INVALID_MAP_LINK: 'Collez un lien Google Maps qui ouvre le lieu.',
  },
  en: {
    NEW_LOCATION_HEADING: 'New location',
    LOCATION_NAME: 'Location',
    INVALID_LOCATION: 'This location already exists.',
    LOCATION_CREATED: 'Location created successfully.',
    COUNTRY: 'Country',
    PARKING_SPOTS: 'Parking spots',
    PARENT_LOCATION: 'Parent Location',
    MAP_LINK: 'Google Maps link',
    INVALID_MAP_LINK: 'Paste a Google Maps link that opens the location.',
  },
  es: {
    NEW_LOCATION_HEADING: 'Nuevo lugar',
    LOCATION_NAME: 'Lugar',
    INVALID_LOCATION: 'Este lugar ya existe.',
    LOCATION_CREATED: 'Lugar creado con éxito.',
    COUNTRY: 'País',
    PARKING_SPOTS: 'Plazas de aparcamiento',
    PARENT_LOCATION: 'Ubicación de los Padres',
    MAP_LINK: 'Enlace de Google Maps',
    INVALID_MAP_LINK: 'Pega un enlace de Google Maps que abra el lugar.',
  },
})

langHelper.setLanguage(strings)
export { strings }
