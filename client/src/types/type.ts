export interface Student {
  id?: number;
  name: string;
  age: number;
  email: string;
}

export interface FetchStudentsResponse {
  metadata: {
    total: number;
    limit: number;
    page: number;
  };
  students: Student[] | [];
}

export enum OperationType {
  create,
  edit,
  delete,
}
