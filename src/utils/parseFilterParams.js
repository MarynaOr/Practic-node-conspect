const parseGender = (gender) => {
  const isString = typeof gender === 'string';
  if (!isString) return;

  const isGender = (gender) =>
    ['male', 'female', 'other'].includes(gender);
  if (isGender(gender)) return gender;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parseNumber = parseInt(number);
  if (Number.isNaN(parseNumber)) {
    return;
  }
  return parseNumber;
};

export const parseFilterParams = (query) => {
  const {
    gender,
    maxAge,
    minAge,
    maxAvgMark,
    minAvgMark,
  } = query;
  const parseGender = parseGender(gender);
  const parsedMaxAge = parseNumber(maxAge);
  const parsedMinAge = parseNumber(minAge);
  const parsedMaxAvgMark =
    parseNumber(maxAvgMark);
  const parsedMinAvgMark =
    parseNumber(minAvgMark);

  return {
    gender: parseGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
  };
};
