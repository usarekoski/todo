import { createStore } from 'redux';
import { Action, Actions, ActionTypes } from '../actions/todoActions';
import { SaveStatus, Todo } from '../types';

type State = {
  readonly todos: Todo[],
  readonly saveId: string,
};

const initialState: State = {
  todos: [],
  saveId: '',
};

function todos(state: State = initialState, action: Action): State {
  switch (action.type) {

    case ActionTypes.TODO_CREATE:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            done: false,
            saveStatus: SaveStatus.Created,
          },
        ],
      };

    case ActionTypes.TODO_DELETE:
      console.log('unimpelemented!');
      return state;
      // return {
      //   ...state,
      //   todos: state.todos.filter(todo => todo.id !== action.id),
      //   saveStatus: saveStatuses.notSaved,
      // };

    case ActionTypes.TODO_DONE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, done: !todo.done, saveStatus: SaveStatus.Modified };
          } else {
            return todo;
          }
        }),
      };

    case ActionTypes.SAVING:
      return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, saveStatus: SaveStatus.Saved })),
      };

    case ActionTypes.SAVE_SUCCESS:
      return {
        ...state,
        saveId: action.id,
      };

    case ActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
      };

    case ActionTypes.SAVE_FAIL:
      return {
        ...state,
        // TODO: keep track of already saved items.
        todos: state.todos.map((todo) => ({ ...todo, saveStatus: SaveStatus.Created })),
      };

    case ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        saveId: action.id,
      };

    case ActionTypes.LOAD_FAIL:
      return {
        ...state,
      };

    default:
      return state;

  }
}

const todoStore = createStore(todos);

export default todoStore;
