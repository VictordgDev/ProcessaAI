export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const STATUS_LABELS = {
  [REQUEST_STATUS.PENDING]: 'Pendente',
  [REQUEST_STATUS.ACCEPTED]: 'Aceito',
  [REQUEST_STATUS.IN_PROGRESS]: 'Em Andamento',
  [REQUEST_STATUS.COMPLETED]: 'Concluído',
  [REQUEST_STATUS.CANCELLED]: 'Cancelado',
}

export const STATUS_COLORS = {
  [REQUEST_STATUS.PENDING]: 'yellow',
  [REQUEST_STATUS.ACCEPTED]: 'blue',
  [REQUEST_STATUS.IN_PROGRESS]: 'purple',
  [REQUEST_STATUS.COMPLETED]: 'green',
  [REQUEST_STATUS.CANCELLED]: 'red',
}
