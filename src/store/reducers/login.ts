import { createReducerFunction, ImmerReducer } from 'immer-reducer';
// import store from '@/store/index';

// store.subscribe(() => {
//   localStorage.setItem('appState', JSON.stringify(store.getState()));
// });

export type ITodo = {
  title: string;
  isComplete: boolean;
  key: string;
};
export type ITodoFilter = {
  all: boolean;
  active: boolean;
  complete: boolean;
};
export type IFormValues = {
  title: string;
  content: string;
  isSaveLineBreakTabs: boolean;
};
export interface LoginState {
  form: {
    values: IFormValues;
    isOpenForm: boolean;
  };
  todosFilter: ITodoFilter;
  todos: ITodo[];
}

export const initialState: LoginState = {
  form: {
    values: {
      title: '',
      content: '',
      isSaveLineBreakTabs: false,
    },
    isOpenForm: false,
  },
  todosFilter: {
    all: true,
    active: false,
    complete: false,
  },
  todos: [
    {
      title: 'string',
      isComplete: false,
      key: 'string',
    },
    {
      title: 'string2',
      isComplete: true,
      key: 'string2',
    },
  ],
};

export class LoginReducer extends ImmerReducer<LoginState> {
  setTodosFilterAll() {
    this.draftState.todosFilter.all = true;
    this.draftState.todosFilter.active = false;
    this.draftState.todosFilter.complete = false;
  }

  setTodosFilterActive() {
    this.draftState.todosFilter.all = false;
    this.draftState.todosFilter.active = true;
    this.draftState.todosFilter.complete = false;
  }

  setTodosFilterComplete() {
    this.draftState.todosFilter.all = false;
    this.draftState.todosFilter.active = false;
    this.draftState.todosFilter.complete = true;
  }

  setCreateTodo(todo: ITodo) {
    this.draftState.todos.push(todo);
  }

  setCompleteTodo(key: string) {
    this.draftState.todos = this.draftState.todos.map(
      (todo: ITodo) => (todo.key === key ? { ...todo, isComplete: !todo.isComplete } : todo),
    );
  }

  setDeleteTodo(key: string) {
    this.draftState.todos = this.draftState.todos.filter((todo: ITodo) => todo.key !== key);
  }

  setChangeValuesForm(values: IFormValues) {
    this.draftState.form.values = values;
  }

  setChangeOpennessForm(isOpen: boolean) {
    this.draftState.form.isOpenForm = isOpen;
  }
}

export default createReducerFunction(LoginReducer, initialState);
