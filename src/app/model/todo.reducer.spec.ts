import * as TodoActions from './todo.actions';
import { TodosReducer } from './todo.reducer';

describe('TodosReducer', () => {

  it('should return a new state with new todos: PopulateTodosAction', () => {
    const newTodos = [{ id: 2, title: 'new todo', isComplete: true }];
    const action = new TodoActions.PopulateTodosAction(newTodos);
    const oldState = [{ id: 1, title: 'todo', isComplete: false }];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(1);
    expect(newState[0].title).toEqual('new todo');
  });

  it('should return a new state with new todos: ToggleAction', () => {
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

  it('should return a new state with new todos: UpdateAction', () => {
    const action = new TodoActions.UpdateAction(1, 'update todo');
    const oldState = [
      { id: 1, title: 'todo', isComplete: false },
      { id: 2, title: 'todo', isComplete: false }
    ];
    const newState = TodosReducer(oldState, action);
    expect(newState.length).toEqual(2);
    expect(newState[0].title).toEqual('update todo');
    expect(newState[1].title).toEqual('todo');
  });

});
