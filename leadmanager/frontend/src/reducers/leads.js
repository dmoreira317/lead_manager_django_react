import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types.js";

const initialState = {
  leads: [],
};

// the initial state is set as default and the action is what exactly we want to dispatch to the reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };
    //IN this add lead, the state.leads brings the leads existing in this state and the action.payload is the new lead
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload],
      };
    default:
      return state;
  }
}
