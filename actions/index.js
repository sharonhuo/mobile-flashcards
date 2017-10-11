export const RECEIEVE_DECKS = "RECEIEVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const FETCH_DECK = "FETCH_DECK";

export function receieveDecks(decks) {
  return {
    type: RECEIEVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard(title, entry) {
  return {
    type: ADD_CARD,
    title,
    entry
  }
}

export function fetchDeck(title) {
  return {
    type: FETCH_DECK,
    title
  }
}