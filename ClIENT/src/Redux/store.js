
import { authReducer } from './Auth/reducer';
import { chattingReducer } from './Chatting/reducer';
import { notyficationReducer } from './Notification/reducer';
import { recentChatReducer } from './RecentChat/reducer';
import { searchReducer } from './Searching/reducer';

import { applyMiddleware, legacy_createStore as createStore , compose, combineReducers} from "redux";
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
       
    }) : compose;


const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  
   
);

const rootReducer = combineReducers({
    user: authReducer,
    chatting: chattingReducer,
    recentChat: recentChatReducer,
    search: searchReducer,
    notification: notyficationReducer,
 
});

export const store = createStore(rootReducer, enhancer);