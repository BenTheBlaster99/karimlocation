import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TITLE: 'Vidange et entretien',
    CAR: 'Voiture',
    PLATE: 'Plaque',
    ODOMETER: 'Kilométrage',
    OIL_DATE: 'Date dernier vidange',
    OIL_KM: 'Kilométrage dernier vidange',
    SERVICE_DATE: 'Date dernier entretien',
    SERVICE_KM: 'Kilométrage dernier entretien',
    SAVE: 'Enregistrer',
    SAVED: 'Enregistré',
    EMPTY: 'Aucune voiture pour le moment.',
  },
  en: {
    TITLE: 'Oil change and service',
    CAR: 'Car',
    PLATE: 'Plate',
    ODOMETER: 'Mileage',
    OIL_DATE: 'Last oil change date',
    OIL_KM: 'Mileage at last oil change',
    SERVICE_DATE: 'Last service date',
    SERVICE_KM: 'Mileage at last service',
    SAVE: 'Save',
    SAVED: 'Saved',
    EMPTY: 'No cars yet.',
  },
  es: {
    TITLE: 'Cambio de aceite y mantenimiento',
    CAR: 'Coche',
    PLATE: 'Matrícula',
    ODOMETER: 'Kilometraje',
    OIL_DATE: 'Fecha del último cambio de aceite',
    OIL_KM: 'Kilometraje del último cambio de aceite',
    SERVICE_DATE: 'Fecha del último mantenimiento',
    SERVICE_KM: 'Kilometraje del último mantenimiento',
    SAVE: 'Guardar',
    SAVED: 'Guardado',
    EMPTY: 'Todavía no hay coches.',
  },
})

langHelper.setLanguage(strings)
export { strings }
