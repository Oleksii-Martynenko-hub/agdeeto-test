import { createActionCreators } from 'immer-reducer';
import { LoginReducer } from '@/store/reducers/login';
// import { AsyncAction } from './common';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setTodosFilterAll>
  | ReturnType<typeof loginActions.setTodosFilterActive>
  | ReturnType<typeof loginActions.setTodosFilterComplete>
  | ReturnType<typeof loginActions.setCreateTodo>
  | ReturnType<typeof loginActions.setCompleteTodo>
  | ReturnType<typeof loginActions.setDeleteTodo>
  | ReturnType<typeof loginActions.setChangeValuesForm>
  | ReturnType<typeof loginActions.setChangeOpennessForm>;

// export const authRestoreAsync = (): AsyncAction => async (dispatch) => {
//   try {
//     dispatch(loginActions.setCreateTodo());

//     dispatch(loginActions.setCompleteTodo());
//   } catch (e) {
//     dispatch(loginActions.setDeleteTodo());
//   }
// };
