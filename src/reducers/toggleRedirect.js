const toggleRedirect = (state = false, action) => {
  switch (action.type) {
    case 'REDIRECT':
      return state = action.payload.value;
    default:
      return state;
  }
}

export default toggleRedirect;