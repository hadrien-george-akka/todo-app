import * as TodoActions from './todo.actions';
import { Todo } from '../model.interface';

describe('TodoActions', () => {
  it('should return an action with todos: PopulateTodosAction', () => {
    const action = new TodoActions.PopulateTodosAction([]);
    expect(action.type).toEqual(TodoActions.POPULATE_TODOS);
    expect(action.todos).toEqual([]);
  });

  it('should return an action with an id: ToggleAction', () => {
    const action = new TodoActions.ToggleAction(1);
    expect(action.type).toEqual(TodoActions.TOGGLE_TODO);
    expect(action.id).toEqual(1);
  });

  it('should return an action with an id, title and description: UpdateAction', () => {
    const action = new TodoActions.UpdateAction(1, 'new title', 'new description');
    expect(action.type).toEqual(TodoActions.UPDATE_TODO);
    expect(action.id).toEqual(1);
    expect(action.title).toEqual('new title');
  });

  it('should return an action with an id, title, description and isComplete: AddTodoAction', () => {
    const newTodo: Todo = {
      id: 1,
      title: 'new title',
      description: 'new description',
      isComplete: false
    };
    const action = new TodoActions.AddTodoAction(newTodo);
    expect(action.type).toEqual(TodoActions.ADD_TODO);
    expect(action.todo.id).toEqual(1);
    expect(action.todo.title).toEqual('new title');
    expect(action.todo.description).toEqual('new description');
    expect(action.todo.isComplete).toEqual(false);
  });

  it('should return an action with an id: DeleteTodoAction', () => {
    const action = new TodoActions.DeleteTodoAction(1);
    expect(action.type).toEqual(TodoActions.DELETE_TODO);
    expect(action.id).toEqual(1);
  });
});
