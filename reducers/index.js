import { RECEIEVE_DECKS, ADD_DECK, ADD_CARD , FETCH_DECK} from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIEVE_DECKS:
      return {
        ...state,
        ...JSON.parse(action.decks)
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    case ADD_CARD:
      const title = action.title;
      let currentDeck = state[title];
      const currentQuestions = currentDeck.questions;
      const newQuetions = [...currentQuestions, action.entry];
      currentDeck.questions = newQuetions;
      return { 
        ...state,
        [title]: currentDeck
       };
    case FETCH_DECK:
      return { ...state };
    default:
      return state
  }
}

export default decks;