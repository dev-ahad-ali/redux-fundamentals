import { legacy_createStore as createStore } from 'redux';

const initialState = {
  name: 'john',
  age: 32,
  post: 0,
};

const INCREMENT = 'post/increment';
const DECREMENT = 'post/decrement';
const INCREASE_BY = 'post/increaseBy';
const DECREASE_BY = 'post/decreaseBy';

function reducer(state = initialState, action) {
  //   if (action.type === INCREMENT) {
  //     return { ...state, post: state.post + 1 };
  //   } else if (action.type === DECREMENT) {
  //     return { ...state, post: state.post - 1 };
  //   } else if (action.type === INCREASE_BY) {
  //     return { ...state, post: state.post + action.payload };
  //   } else if (action.type === DECREASE_BY) {
  //     return { ...state, post: state.post - action.payload };
  //   }
  //   return state;
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREASE_BY:
      return { ...state, post: state.post + action.payload };
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

console.log(store);

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: INCREMENT });
store.dispatch({ type: DECREMENT });
store.dispatch({ type: INCREASE_BY, payload: 4 });
store.dispatch({ type: DECREASE_BY, payload: 2 });
