export function shuffle(a) {
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }

  return a;
}

export function chunks(array, size) {
  const result = [];
  while (array.length) {
    result.push(array.splice(0, size));
  }

  return result;
};