import axios from "axios";
import {RECEIVE_EVENT_LIST} from "../../constants";

export const receiveEventList = function(eventList) {
  
  return {
    type: RECEIVE_EVENT_LIST,
    eventList
  };
};

export const createDisciplineEvents = (data, user) => dispatch => {

  return axios
    .post("/api/disciplineEvent", { data, user }) 
    .then(eventList => eventList); //retorno el axios y el el container, realizado el ingreso vuelvo a ejecutar el fetch
};
export const fetchDisciplineEvents = userId => dispatch => {
 
  return axios
    .get(`/api/disciplineEvent/${ userId }`)
    .then(res => res.data)
    .then(eventList => {
      console.log("soy la event list del axios", eventList)
      dispatch(receiveEventList(eventList))
      return eventList
    
    });
};