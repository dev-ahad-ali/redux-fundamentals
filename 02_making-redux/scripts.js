import { legacy_createStore as createStore } from 'redux';
import { myCreateStore } from './my-redux.js';

const initialState = {
  name: 'john',
  age: 32,
  post: 0,
};

const postCountElement = document.querySelector('#post-count');

const INCREMENT = 'post/increment';
const DECREMENT = 'post/decrement';
const INCREASE_BY = 'post/increaseBy';
const DECREASE_BY = 'post/decreaseBy';

function reducer(state = initialState, action) {
  /* if (action.type === INCREMENT) {
      return { ...state, post: state.post + 1 };
    } else if (action.type === DECREMENT) {
      return { ...state, post: state.post - 1 };
    } else if (action.type === INCREASE_BY) {
      return { ...state, post: state.post + action.payload };
    } else if (action.type === DECREASE_BY) {
      return { ...state, post: state.post - action.payload };
    }
    return state; */

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

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
const myStore = myCreateStore(reducer);

console.log(store);
console.log(myStore);

const unsubscribe1 = myStore.subscribe(() => {
  console.log(myStore.getState());
  postCountElement.innerText = myStore.getState().post;
});

const unsubscribe2 = myStore.subscribe(() => {
  console.log('Hello');
});

postCountElement.innerText = store.getState().post;

myStore.dispatch({ type: INCREMENT });

unsubscribe2();

// console.log(myStore.getState());
myStore.dispatch({ type: DECREMENT });
// console.log(myStore.getState());
myStore.dispatch({ type: INCREASE_BY, payload: 4 });
// console.log(myStore.getState());
myStore.dispatch({ type: DECREASE_BY, payload: 2 });
// console.log(myStore.getState());

postCountElement.addEventListener('click', () => {
  myStore.dispatch({ type: INCREMENT });
});
