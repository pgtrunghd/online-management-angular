const filterFn = (data: any) => {
  const result = Object.keys(data).reduce((acc: any, item) => {
    if (!data[item]) return acc;
    if (typeof data[item] === 'object') {
      acc[item] = data[item].code.toLowerCase();
    } else {
      acc[item] = data[item];
    }
    return acc;
  }, {});

  return result;
};

export default filterFn;
