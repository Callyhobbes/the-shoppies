const initialState = {
  number: 0,
  movie: [],
}

const counterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT':
      if (state.number < 5 && !state.movie.find(e => e === action.payload.insert)) {
        state = {
          ...state,
          number: state.number + action.payload.add,
          movie: [...state.movie, action.payload.insert]
        };
        return state;
      } else {
        return state;
      };
    case 'REMOVE':
        state = {
          ...state,
          number: state.number - action.payload.remove,
          movie: state.movie.filter(index => index !== action.payload.selected)
        };
      return state;
    default:
      return state;
  }
}

export default counterReducer;