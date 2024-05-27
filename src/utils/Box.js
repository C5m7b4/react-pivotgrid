export const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  trace: () => {
    console.log("internal trace: ", x);
    return Box(x);
  },
  inspect: () => "Box: (" + x + ")",
});
