type OrderByType = {
  ignoreCase: boolean;
  direction: 'ASC' | 'DESC';
  property: string;
  ascending: boolean;
};

type SortType = {
  sorted: boolean;
  orderBy: OrderByType[];
};

export type Pageable = {
  number: number;
  size: number;
  offset: number;
  sort: SortType;
  unpaged: boolean;
  sorted: boolean;
};