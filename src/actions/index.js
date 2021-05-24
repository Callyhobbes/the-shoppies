export const increment = (e) => {
  return {
    type: 'INCREMENT',
    payload: {
      add: 1,
      insert: e,
      title: e.Title,
      year: e.Year
    }
  }
};

export const deleteItem = (index) => {
  return {
    type: 'REMOVE',
    payload: {
      remove: 1,
      selected: index.movie,
  }
  }
};

export const toggleModal = (index) => {
  return {
    type: 'MODAL',
    payload: {
      value: index
    }
  }
};

export const toggleRedirect = (index) => {
  return {
    type: 'REDIRECT',
    payload: {
      value: index
    }
  }
};