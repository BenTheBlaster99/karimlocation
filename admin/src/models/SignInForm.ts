import { z } from 'zod'
import { strings as commonStrings } from '@/lang/common'
import env from '@/config/env.config'

export const schema = z.object({
  email: z.string().min(1, { message: commonStrings.REQUIRED }),
  password: z.string().min(env.PASSWORD_MIN_LENGTH, { message: commonStrings.PASSWORD_ERROR }),
  stayConnected: z.boolean().optional()
})

export type FormFields = z.infer<typeof schema>
