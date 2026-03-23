type LogPayload = Record<string, unknown>

const formatPayload = (payload?: LogPayload) => {
  if (!payload) {
    return ''
  }

  return ` ${JSON.stringify(payload)}`
}

export const logInfo = (message: string, payload?: LogPayload) => {
  console.info(`[CampusEating] ${message}${formatPayload(payload)}`)
}

export const logError = (message: string, payload?: LogPayload) => {
  console.error(`[CampusEating] ${message}${formatPayload(payload)}`)
}
