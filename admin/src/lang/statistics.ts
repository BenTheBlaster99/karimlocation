import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TITLE: 'Statistiques',
    TOTAL: 'Total encaissé',
    COUNT: 'Locations payées',
    EMPTY: 'Aucune location n’est encore marquée Payée (totalité).',
    WEEK: 'Semaine',
    MONTH: 'Mois',
    YEAR: 'Année',
    PERIOD_EMPTY: 'Aucun paiement sur cette période.',
    ALL: 'Total payé',
    CAR: 'Voiture',
    CLIENT: 'Client',
    FROM: 'Début',
    TO: 'Fin',
    PRICE: 'Montant',
  },
  en: {
    TITLE: 'Statistics',
    TOTAL: 'Total collected',
    COUNT: 'Paid rentals',
    EMPTY: 'No rental is marked Paid in full yet.',
    WEEK: 'Week',
    MONTH: 'Month',
    YEAR: 'Year',
    PERIOD_EMPTY: 'No payments in this period.',
    ALL: 'All paid',
    CAR: 'Car',
    CLIENT: 'Client',
    FROM: 'Start',
    TO: 'End',
    PRICE: 'Amount',
  },
  es: {
    TITLE: 'Estadísticas',
    TOTAL: 'Total cobrado',
    COUNT: 'Alquileres pagados',
    EMPTY: 'Ningún alquiler está marcado como Pagado (totalidad).',
    WEEK: 'Semana',
    MONTH: 'Mes',
    YEAR: 'Año',
    PERIOD_EMPTY: 'No hay pagos en este período.',
    ALL: 'Total pagado',
    CAR: 'Coche',
    CLIENT: 'Cliente',
    FROM: 'Inicio',
    TO: 'Fin',
    PRICE: 'Importe',
  },
})

langHelper.setLanguage(strings)
export { strings }
