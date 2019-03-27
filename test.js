function test(a, b, c) {
  console.log("arguments" + arguments + " " + arguments.length);
  return a + b;
}

test.double = function() {
  return 84;
};

console.log(test(21, 21, 21));
console.log(test.double());

var state = {};

state.a = 1;
state.b = 2;

var { c } = state;

console.log("state", state);
console.log("c", c);
