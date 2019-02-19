export interface Todo {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

/**
 * Return an array of mocked todos
 */
export function mockTodos(): Todo[] {
  return [
    {
      id: 1,
      title: 'Groceries',
      description: '-Eggs \n- Bread\n- Cereal',
      isComplete: false
    },
    {
      id: 2,
      title: 'Deposit christmas check',
      isComplete: true
    },
    {
      id: 3,
      title: 'Call mom',
      isComplete: true
    },
    {
      id: 4,
      title: 'Walk the dog',
      isComplete: false
    },
    {
      id: 5,
      title: 'Book train ticket',
      description: 'Train 02/06/19 Departure TOULOUSE at 10:23 - Arrival PARIS at 17:42',
      isComplete: false
    }
  ];
}
