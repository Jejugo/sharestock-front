import axios from 'axios';
import { FETCH_SHARE, GET_ALL_SHARES } from '../actions'
import config from "../../configs";

const { SHARE_API } = config;

export const fetchShare = () => async (dispatch) => {
  let shares = await axios(`${SHARE_API}/shares`)
  return dispatch({ type: FETCH_SHARE, payload: shares.data })
};

export const getAllShares = () => async (dispatch) => {
  dispatch({type: GET_ALL_SHARES})
};
