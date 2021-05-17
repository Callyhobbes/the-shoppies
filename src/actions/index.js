export const increment = (e) => {
  return {
    type: 'INCREMENT',
    payload: {
      add: 1,
      insert: e
    }
  }
};

export const deleteItem = (index) => {
  return {
    type: 'REMOVE',
    payload: {
      remove: 1,
      selected: index.movie
  }
  }
};