export interface ApiJsonModelInterface<T> {
  data: {
    type: string;
    attributes: T;
  };
}
