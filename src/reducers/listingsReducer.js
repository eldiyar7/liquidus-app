import { POSTAL_CODES_REQUESTED, POSTAL_CODES_RECEIVED, LISTINGS_RECEIVED } from '../actions/types';

const initialState = { 
  listings: [],
  postalCodes: [],
  listingsByPostalCode: {},
  isRetrieving: false,
};

export default function(state = initialState, action) {
    switch (action.type) {

      case POSTAL_CODES_REQUESTED:
        return {
          ...state,
          isRetrieving: true,
        };
      
      case POSTAL_CODES_RECEIVED:
        return {
          ...state,
          isRetrieving: false,
          postalCodes: action.payload 
        };
      
      case LISTINGS_RECEIVED:
        return {
          ...state,
          listingsByPostalCode: {
            ...state.listingsByPostalCode,
            [action.id]: action.payload
          }
        };
        
      default:
        return state;
    }
  }