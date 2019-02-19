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
      title: 'Faire les courses',
      description: `-Oeufs
      - Pain
      - Céréales`,
      isComplete: false
    },
    {
      id: 2,
      title: 'Déposer le chèque',
      isComplete: true
    },
    {
      id: 3,
      title: 'Appeler maman',
      isComplete: true
    },
    {
      id: 4,
      title: 'Promener le chien',
      isComplete: false
    },
    {
      id: 5,
      title: 'Reserver le billet de train',
      description: 'Train 02/06/19 Départ TOULOUSE à 10:23 - Arrivée PARIS à 17:42',
      isComplete: false
    }
  ];
}
