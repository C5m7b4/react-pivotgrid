export const unique = (array, field) => {
  const newArray = [];
  const headers = [];
  array.forEach((record) => {
    if (!headers.includes(record[field])) {
      headers.push(record[field]);
      newArray.push(record);
    }
  });

  return newArray;
};
