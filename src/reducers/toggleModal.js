const toggleModal = (state = false, action) => {
  switch (action.type) {
    case 'MODAL':
      return !state;
    default:
      return state;
  }
}

export default toggleModal;