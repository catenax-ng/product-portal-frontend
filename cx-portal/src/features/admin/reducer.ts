import { combineReducers } from 'redux'
import { reducer as service } from './service/reducer'
import { slice as approle } from './approle/slice'
import { slice as registration } from './registration/slice'
import { slice as user } from './user/slice'
import { slice as userOwn } from './userOwn/slice'

export const reducer = combineReducers({
  service,
  approle: approle.reducer,
  registration: registration.reducer,
  user: user.reducer,
  userOwn: userOwn.reducer,
})

const Reducer = { reducer }

export default Reducer
