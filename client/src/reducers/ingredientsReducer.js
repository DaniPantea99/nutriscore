const initState = {
  all: [],
  filtered: [],
};

const ingredientsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_INGREDIENTS':
      return {
        ...state,
        all: action.payload.all,
        filtered: action.payload.all,
      };
    default:
      return { ...state };
  }
};

export default ingredientsReducer;
