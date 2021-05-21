const toggleModal = (state = false, action) => {
  switch (action.type) {
    case 'MODAL':
      return state = action.payload.value;
    default:
      return state;
  }
}

export default toggleModal;