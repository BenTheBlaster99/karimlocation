import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    FAQ_TITLE: 'FAQ',
    MORE_QUESTIONS: 'Plus de questions ?',
    FAQ_DOCUMENTS_TITLE: 'De quels documents ai-je besoin pour louer un véhicule ?',
    FAQ_DOCUMENTS_TEXT: "Pour louer un véhicule, présentez un permis de conduire valide et une pièce d'identité. Le dépôt de garantie se règle en dinars algériens.",
    FAQ_SERVICES_TITLE: 'Proposez-vous des services de livraison et de restitution ?',
    FAQ_SERVICES_TEXT: 'Oui. La prise en charge et la restitution se font à Alger et à Harrach. Indiquez le lieu souhaité lors de la réservation.',
    FAQ_AGE_TITLE: "Y a-t-il une limite d'âge pour louer un véhicule ?",
    FAQ_AGE_TEXT: "Oui. L'âge minimum pour louer un véhicule est de 21 ans.",
  },
  en: {
    FAQ_TITLE: 'FAQ',
    MORE_QUESTIONS: 'More questions?',
    FAQ_DOCUMENTS_TITLE: 'What documents do I need to rent a vehicle?',
    FAQ_DOCUMENTS_TEXT: 'To rent a vehicle, bring a valid driving licence and an identity document. The security deposit is paid in Algerian dinars.',
    FAQ_SERVICES_TITLE: 'Do you offer delivery and pickup services?',
    FAQ_SERVICES_TEXT: 'Yes. Pickup and drop-off are in Alger and Harrach. Choose the place when you book.',
    FAQ_AGE_TITLE: 'Is there an age requirement for renting a vehicle?',
    FAQ_AGE_TEXT: 'Yes. The minimum age to rent a vehicle is 21.',
  },
  es: {
    FAQ_TITLE: 'Preguntas frecuentes',
    MORE_QUESTIONS: '¿Más preguntas?',
    FAQ_DOCUMENTS_TITLE: '¿Qué documentos necesito para alquilar un vehículo?',
    FAQ_DOCUMENTS_TEXT: 'Para alquilar un vehículo, presenta un permiso de conducir válido y un documento de identidad. El depósito de garantía se paga en dinares argelinos.',
    FAQ_SERVICES_TITLE: '¿Ofrecen servicios de entrega y recogida?',
    FAQ_SERVICES_TEXT: 'Sí. La recogida y la devolución son en Argel y Harrach. Indica el lugar al reservar.',
    FAQ_AGE_TITLE: '¿Existe un requisito de edad para alquilar un vehículo?',
    FAQ_AGE_TEXT: 'Sí. La edad mínima para alquilar un vehículo es de 21 años.',
  },
})

langHelper.setLanguage(strings)
export { strings }
