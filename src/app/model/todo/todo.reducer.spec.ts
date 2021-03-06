import * as TodoActions from './todo.actions';
import { TodosReducer } from './todo.reducer';
import { Todo } from '../model.interface';

describe('TodosReducer', () => {

  it('should return a new state with new todos: PopulateTodosAction', () => {
    const newTodos = [{ id: 2, title: 'new todo', isComplete: true }];
    const action = new TodoActions.PopulateTodosAction(newTodos);
    const oldState = [{ id: 1, title: 'todo', isComplete: false }];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(1);
    expect(newState[0].title).toEqual('new todo');
  });

  it('should return a new state with a isComplete value changed: ToggleAction', () => {
    const action = new TodoActions.ToggleAction(1);
    const oldState = [
      { id: 1, title: 'todo', isComplete: false },
      { id: 2, title: 'todo', isComplete: false }
    ];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(2);
    expect(newState[0].isComplete).toBeTruthy();
    expect(newState[1].isComplete).toBeFalsy();
  });

  it('should return a new state with a todo values changed: UpdateAction', () => {
    const action = new TodoActions.UpdateAction(1, 'update todo', 'update description');
    const oldState = [
      { id: 1, title: 'todo', description: 'todo', isComplete: false },
      { id: 2, title: 'todo', description: 'todo', isComplete: false }
    ];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(2);
    expect(newState[0].title).toEqual('update todo');
    expect(newState[1].title).toEqual('todo');
    expect(newState[0].description).toEqual('update description');
    expect(newState[1].description).toEqual('todo');
  });

  it('should return a new state with one new todo: AddTodoAction', () => {
    const newTodo: Todo = {
      id: 2,
      title: 'new title',
      description: 'new description',
      isComplete: false
    };
    const action = new TodoActions.AddTodoAction(newTodo);
    const oldState = [{ id: 1, title: 'todo', isComplete: false }];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(2);
    expect(newState[1].id).toEqual(2);
    expect(newState[1].title).toEqual('new title');
    expect(newState[1].description).toEqual('new description');
    expect(newState[1].isComplete).toEqual(false);
  });

  it('should return a new state without one todo: DeleteTodoAction', () => {
    const action = new TodoActions.DeleteTodoAction(1);
    const oldState = [
      { id: 1, title: 'todo', isComplete: false },
      { id: 2, title: 'todo', isComplete: false }
    ];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(1);
    expect(newState).not.toContain(oldState[0]);
    expect(newState[0].id).toEqual(2);
  });

  it('should return a new state with all todos sorted by descending id', () => {
    const action = new TodoActions.SortTodoAction();
    const oldState = [
      { id: 1, title: 'one', isComplete: false },
      { id: 2, title: 'two', isComplete: false },
      { id: 3, title: 'three', isComplete: false },
    ];
    const newState = TodosReducer(oldState, action);
    expect(newState[0].id).toEqual(oldState.length);
    expect(newState[newState.length - 1].id).toEqual(1);
  });

});
