import { TEST_ACTION } from '../actions/actions'

function reducer (state, action) {
  switch (action.type) {
    case TEST_ACTION:
      return state
    default:
      return state
  }
}

export default reducer