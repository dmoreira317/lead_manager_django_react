// here we make all our http requests, here the actions take place
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// action method GET LEADS, dispatch sends the action to the leads reducer. this is called from the leads component /components/leads/Leads

export const getLeads = () => (dispatch) => {
  axios
    .get("/api/leads/")
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete lead, takes in an id
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      //here i will send the prop msg to the create message action, which will send the CREATE_MESSAGE type to the messaeges reducer, which will set the state to that message, and GET_MESSAGES will return that message, which will be sent to alerts to show on screen.
      dispatch(createMessage({ leadDeleted: "Lead deleted" }));
      dispatch({
        //once it gets sent to the server, i want to say DELETE_LEAD
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD lead
export const addLead = (lead) => (dispatch) => {
  axios
    .post(`/api/leads/`, lead)
    .then((res) => {
      dispatch(createMessage({ leadAdded: "Lead added" }));
      dispatch({
        //once it gets sent to the server, i want to say ADD_LEAD
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
