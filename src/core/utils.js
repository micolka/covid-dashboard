export function calcCircleRadius(cases) {
  let coefficient = 0;
  if (cases > 5000000) {
    coefficient = 12;
  } else if (cases > 1000000) {
    coefficient = 10;
  } else if (cases > 500000) {
    coefficient = 9;
  } else if (cases > 400000) {
    coefficient = 8;
  } else if (cases > 250000) {
    coefficient = 7;
  } else if (cases > 100000) {
    coefficient = 6;
  } else if (cases > 50000) {
    coefficient = 5;
  } else if (cases > 20000) {
    coefficient = 4;
  } else if (cases > 3000) {
    coefficient = 3;
  } else if (cases > 1000) {
    coefficient = 2;
  } else if (cases > 1) {
    coefficient = 1;
  }
  return coefficient * 2;
}

export function theOtherOne() {
  return 0;
}
