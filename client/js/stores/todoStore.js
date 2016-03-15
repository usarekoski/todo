import { ReduceStore } from 'flux/utils';

import dispatcher from "../dispatcher";
import TodoConstants from "../constants/todoConstants";

class TodoStore extends ReduceStore {

  getInitialState() {
    return {todos: [], saveId: "", saveStatus: "Not saved"};
  }

  reduce(state, action) {
    switch(action.type) {

      case TodoConstants.TODO_CREATE:
        return Object.assign({}, state,
           {todos: [
             ...state.todos,
             {
               id: action.id,
               text: action.text,
               done: false
             }
           ]
        });

      case TodoConstants.TODO_DELETE:
        return Object.assign({}, state,
          {todos: state.todos.filter(todo => todo.id !== action.id)}
        );

      case TodoConstants.TODO_DONE:
        return Object.assign({}, state,
          {todos: state.todos.map(todo => {
            if (todo.id === action.id) {
              let newTodo = todo;
              newTodo.done = !todo.done;
              return newTodo;
            } else {
              return todo;
            }
          })}
        );

      case TodoConstants.SAVE_SUCCESS:
        return Object.assign({}, state,
          {saveId: action.id, saveStatus: "Saved"}
        );

      case TodoConstants.SAVE_FAIL:
        return Object.assign({}, state,
          {saveStatus: action.text}
        );

      default:
        return state;

    }
  }

}

const todoStore = new TodoStore(dispatcher);

export default todoStore;
