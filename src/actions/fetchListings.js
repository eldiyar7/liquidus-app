import axios from 'axios';
import get from 'lodash/get';
import { POSTAL_CODES_REQUESTED, POSTAL_CODES_RECEIVED, LISTINGS_REQUESTED, LISTINGS_RECEIVED, ADD_ERROR } from './types';



// Request user postal codes
export const requestPostalCodes = () => dispatch => {
  dispatch({
    type: POSTAL_CODES_REQUESTED
  })
  return fetchPostalcodes()
    .then(response => get(response, 'data.results'))
    .then(data => {
      dispatch({
        type: POSTAL_CODES_RECEIVED,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        error: err
      });
    });
};

// Request user listings by postal code
const requestListingsByPostalCode = postalCode => dispatch => {
  dispatch({
    type: LISTINGS_REQUESTED
  });
  return fetchListingsByPostalCode(postalCode).then(data => {
    const listings = get(data, 'data.results');
    return dispatch({
      type: LISTINGS_RECEIVED,
      id: postalCode,
      payload: listings
    });
  });
}


export const fetchListings = () => (dispatch, getState) => {
  dispatch(requestPostalCodes()).then(() => {
    const postalCodeArray = getState().listings.postalCodes;
    postalCodeArray.forEach(({ postalCode }) => {
      dispatch(requestListingsByPostalCode(+postalCode));
    });
  })
};
  

const fetchPostalcodes = () => {
  const url = 'http://api.cofactordigital.com/retail/0ba78575560c024e/postalcodes.json';
  return axios.get(url);
};

const fetchListingsByPostalCode = postalCode => {
  const url = `https://api.cofactordigital.com/retail/0ba78575560c024e/listings.json?postalcode=${postalCode}&returnmode=full&sort=26`;
  return axios.get(url);
};