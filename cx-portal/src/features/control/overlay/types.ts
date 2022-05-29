export const name = 'control/overlay'

export enum Overlay {
  NONE = 'NONE',
  COMPANY = 'COMPANY',
  USER = 'USER',
  APP = 'APP',
}

export type OverlayState = {
  type: Overlay
  id: string
}

export const initialState = {
  type: Overlay.NONE,
  id: '',
}