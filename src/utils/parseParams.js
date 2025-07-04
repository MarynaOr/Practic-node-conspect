import { SORT_ORDER } from '../contacts/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [
    SORT_ORDER.ASC,
    SORT_ORDER.DESC,
  ].includes(sortOrder);
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keyOfStudent = [
    '_id',
    'name',
    'age',
    'gender',
    'avgMark',
    'onDuty',
    'createdAt',
    'updatedAt',
  ];
  if (keyOfStudent.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const pzrseParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder =
    parseSortOrder(sortOrder);
  const parsedSortBy = parsedSortBy(sortBy);
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
