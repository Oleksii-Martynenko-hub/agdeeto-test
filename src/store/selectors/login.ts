import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { ITodo, ITodoFilter, LoginState } from '@/store/reducers/login';

const selectLogin = (state: State) => state.loginReducer;

export const selectLoginState: Selector<State, LoginState> = createSelector(
  selectLogin,
  (loginState) => loginState,
);

export const selectLoginTodos: Selector<State, ITodo[]> = createSelector(
  selectLogin,
  ({ todos }) => todos,
);

export const selectLoginCompleteTodo: Selector<State, ITodo[]> = createSelector(
  selectLogin,
  ({ todos }) => todos.filter((todo: ITodo) => todo.isComplete === true),
);

export const selectLoginActiveTodo: Selector<State, ITodo[]> = createSelector(
  selectLogin,
  ({ todos }) => todos.filter((todo: ITodo) => todo.isComplete === false),
);

export const selectLoginTodoFilter: Selector<State, ITodoFilter> = createSelector(
  selectLogin,
  ({ todosFilter }) => todosFilter,
);

// export const selectLoginChangeValuesForm: Selector<State, boolean> = createSelector(
//   selectLogin,
//   ({ ChangeValuesForm }) => ChangeValuesForm,
// );

// export const selectLoginChangeOpennessForm: Selector<State, boolean> = createSelector(
//   selectLogin,
//   ({ ChangeOpennessForm }) => changeOpennessForm,
// );
