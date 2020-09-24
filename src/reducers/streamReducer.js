import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // create a new object out of the streams we got from api (action.payload) using mapKeys. the keys inside of that object are the ids of the individual streams. 
            // update state with the new object we got from using mapKeys 
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            // const newState = { ...state };
            // key is id, value is action.payload 
            // newState[action.payload.id] = action.payload;
            // return newState

            // this code does the same thing as the above commented out code 
            // [action.payload.id] <-- not an array but a key interpolation. looks at action payload property and finds the id, whatever the id is, create a new key using it inside of the new state object, and to that key assign action.payload 
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // use lodash omit which automatically creates a new state object to delete stream. we don't have to add in action.payload.id bc when we dispatch an action of type delete stream the payload is the id itself. (id was passed in for the deleteStream action creator and assigned to payload)
            return _.omit(state, action.payload);
        default:
            return state;
    }
}