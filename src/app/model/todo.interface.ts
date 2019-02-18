export interface Todo {
  id: number;
  title: string;
  description?: string;
  state: StateTodo;
}

export enum StateTodo {
  INCOMPLETE = 0,
  COMPLETE = 1
}

export function mockTodos(): Todo[] {
  return [
    {
      id: 1,
      title: 'Faire les courses',
      description: `-Oeufs
      - Pain
      - Céréales`,
      state: 0
    },
    {
      id: 2,
      title: 'Déposer le chèque',
      state: 1
    }
  ];
}
