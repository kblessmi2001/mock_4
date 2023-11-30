
import {
  ADD_QUESTION,
  GET_QUESTIONS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  questions: [],
};

export const questionsReducer = (state = initState, {type,payload}) => {
  switch (type) {
    case GET_QUESTIONS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        questions: payload,
      };
    }
    case ADD_QUESTION:{
        return{
            ...state,
            isLoading: false,
            isError: false,
            questions:[...state.questions,payload]
        }
    }

    default:
      return state;
  }
};