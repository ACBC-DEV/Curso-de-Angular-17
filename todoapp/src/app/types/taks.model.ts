export interface Task {
  id: string;
  title: string;
  completed: boolean;
  editing: boolean;
}
export type Tfilter = 'all' | 'pending' | 'completed';
