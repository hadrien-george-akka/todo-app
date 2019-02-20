import * as TodoActions from './todo.actions';

describe('TodoActions', () => {

  describe('Test for PopulateTodosAction', () => {

    it('should return an action with todos', () => {
      const action = new TodoActions.PopulateTodosAction([]);
      expect(action.type).toEqual(TodoActions.POPULATE_TODOS);
      expect(action.todos).toEqual([]);
    });

  });

  describe('Test for ToggleAction', () => {

    it('should return an action with an id', () => {
      const action = new TodoActions.ToggleAction(1);
      expect(action.type).toEqual(TodoActions.TOGGLE_TODO);
      expect(action.id).toEqual(1);
    });

  });

  describe('Test for UpdateAction', () => {

    it('should return an action with an id and text', () => {
      const action = new TodoActions.UpdateAction(1, 'new text');
      expect(action.type).toEqual(TodoActions.UPDATE_TODO);
      expect(action.id).toEqual(1);
      expect(action.title).toEqual('new text');
    });

  });

});
