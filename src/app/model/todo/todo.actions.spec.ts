import { Component } from '@angular/core';

import * as TodoActions from './todo.actions';


// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'blank-cmp',
//   template: ``
// })
// // tslint:disable-next-line:component-class-suffix
// export class TestComponent {
// }

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
    const action = new TodoActions.AddTodoAction(1, 'new title', 'new description', false);
    expect(action.type).toEqual(TodoActions.ADD_TODO);
    expect(action.id).toEqual(1);
    expect(action.title).toEqual('new title');
    expect(action.description).toEqual('new description');
    expect(action.isComplete).toEqual(false);
  });

  it('should return an action with an id: DeleteTodoAction', () => {
    const action = new TodoActions.DeleteTodoAction(1);
    expect(action.type).toEqual(TodoActions.DELETE_TODO);
    expect(action.id).toEqual(1);
  });
});
