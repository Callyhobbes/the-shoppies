const initialState = {
  number: 0,
  movie: [],
  title: "" 
};

const counterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT':
      // && !state.movie.includes(action.payload.insert)
      if (state.number < 5 && !state.title.includes(action.payload.title)) {
        state = {
          ...state,
          number: state.number + action.payload.add,
          movie: [...state.movie, action.payload.insert],
          title: [...state.title, action.payload.title]
        };

        return state;
      } else {
        return state;
      };
    case 'REMOVE':
        state = {
          ...state,
          number: state.number - action.payload.remove,
          movie: state.movie.filter(index => index !== action.payload.selected),
          title: state.title.filter(index => index !== action.payload.selected.Title)
        };
      return state;
    default:
      return state;
  }
}

export default counterReducer;