import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ITodo, ITodoFilter } from '@/store/reducers/login';
import { LoginActions, loginActions } from '@/store/actions/login';
import {
  selectLoginCompleteTodo,
  selectLoginActiveTodo,
  selectLoginTodos,
  selectLoginTodoFilter,
} from '@/store/selectors/login';
import { State } from '@/store';

interface TodoListProps {
  todos: ITodo[];
  todosActive: ITodo[];
  todosComplete: ITodo[];
  todosFilter: ITodoFilter;
  filterAll: () => LoginActions;
  filterActive: () => LoginActions;
  filterComplete: () => LoginActions;
  completeTodo: (key: string) => LoginActions;
  deleteTodo: (key: string) => LoginActions;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  todosActive,
  todosComplete,
  todosFilter,
  filterAll,
  filterActive,
  filterComplete,
  completeTodo,
  deleteTodo,
}) => {
  const filterAllHandler = () => filterAll();
  const filterActiveHandler = () => filterActive();
  const filterCompleteHandler = () => filterComplete();

  const changeHandler = (key: string) => () => {
    completeTodo(key);
  };

  const handleDelete = (key: string) => () => {
    deleteTodo(key);
  };

  const renderTodosHandler = () => {
    if (todosFilter.active) return todosActive;
    if (todosFilter.complete) return todosComplete;
    return todos;
  };

  const renderTodos = renderTodosHandler();

  return (
    <>
      <div>
        <button type="button" onClick={filterAllHandler}>all</button>
        <button type="button" onClick={filterActiveHandler}>active</button>
        <button type="button" onClick={filterCompleteHandler}>complete</button>
      </div>

      {!renderTodos.length && (
        <TodoStyled>
          <h2>Your todo list is empty yet</h2>
        </TodoStyled>
      )}

      {renderTodos.map(({ title, key, isComplete }) => (
        <TodoStyled isComplete={isComplete} key={key}>
          <CompleteCheckbox type="checkbox" name="isComplete" checked={isComplete} onChange={changeHandler(key)} />
          <TitleStyled>{title}</TitleStyled>
          <BtnDelNote onClick={handleDelete(key)} />
        </TodoStyled>
      ))}
    </>
  );
};

const mapStateToProps = (state: State) => ({
  todos: selectLoginTodos(state),
  todosActive: selectLoginActiveTodo(state),
  todosComplete: selectLoginCompleteTodo(state),
  todosFilter: selectLoginTodoFilter(state),
});
const mapDispatchToProps = {
  filterAll: loginActions.setTodosFilterAll,
  filterActive: loginActions.setTodosFilterActive,
  filterComplete: loginActions.setTodosFilterComplete,
  completeTodo: loginActions.setCompleteTodo,
  deleteTodo: loginActions.setDeleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

const CompleteCheckbox = styled.input`
  width: 35px;
  height: 35px;
  top: 2px;
  left: -10px;
  position: relative;
`;

const TitleStyled = styled.h2``;

const TodoStyled = styled.div<{ isComplete?: boolean }>`
  position: relative;
  width: calc(100% - 12px);
  display: flex;
  top: 0;
  left: 0;
  margin-bottom: 10px;
  font-family: serif;
  border-bottom: 1px solid rgb(185, 185, 185);
  & ${TitleStyled} {
    text-decoration: ${({ isComplete }) => (isComplete ? 'line-through' : 'none')};
    font-size: 18px;
    font-weight: 500;
    height: 32px;
    line-height: 38px;
    width: calc(100% - 77px);
    color: ${({ isComplete }) => (isComplete ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.9)')};
    overflow: auto hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const BtnDelNote = styled.button`
  width: 35px;
  height: 35px;
  border: 1px solid rgb(185, 185, 185);
  border-radius: 3px;
  position: absolute;
  top: 1px;
  right: -2px;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 26px;
    height: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    border-radius: 5px;
    background-color: #c31f1f;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
