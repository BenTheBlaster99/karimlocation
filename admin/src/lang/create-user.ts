import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    CREATE_USER_HEADING: 'Nouvelle utilisateur',
    BIRTH_DATE: 'Date de naissance',
    USERNAME: "Nom d'utilisateur",
    USERNAME_NOT_VALID: "Nom d'utilisateur invalide (lettres, chiffres, . _ - uniquement, 3 caractères minimum).",
    USERNAME_TAKEN: "Ce nom d'utilisateur est déjà utilisé.",
  },
  en: {
    CREATE_USER_HEADING: 'New user',
    BIRTH_DATE: 'Birth date',
    USERNAME: 'Username',
    USERNAME_NOT_VALID: 'Invalid username (letters, digits, . _ - only, at least 3 characters).',
    USERNAME_TAKEN: 'This username is already taken.',
  },
  es: {
    CREATE_USER_HEADING: 'Nuevo usuario',
    BIRTH_DATE: 'Fecha de nacimiento',
    USERNAME: 'Nombre de usuario',
    USERNAME_NOT_VALID: 'Nombre de usuario no válido (letras, dígitos, . _ - solamente, al menos 3 caracteres).',
    USERNAME_TAKEN: 'Este nombre de usuario ya está en uso.',
  },
})

langHelper.setLanguage(strings)
export { strings }
