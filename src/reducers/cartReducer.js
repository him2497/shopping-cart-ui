export default (state = {}, action) => {
    switch (action.type) {
      case 'CART_UPDATE':
        return {
          result: action.payload
        }
      case 'CART_DISCOUNT':
        return {
          result: action.payload
        }
      default:
        return state
    }
  }