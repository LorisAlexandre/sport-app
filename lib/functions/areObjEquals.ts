function areObjectsEqual<T extends { [key: string]: any }>(
  obj1: T,
  obj2: T
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === null && value2 === null) {
      continue;
    }

    if (typeof value1 === "object" && typeof value2 === "object") {
      if (!areObjectsEqual(value1, value2)) {
        return false;
      }
    } else if (value1 !== value2) {
      return false;
    }
  }

  return true;
}

export { areObjectsEqual };
