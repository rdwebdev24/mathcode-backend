// random questions forming code //
const data = [];
const opt = ["opt A", "opt B", "opt C", "opt D"];
const level1 = ["9th", "10th", "11th", "12th"];
const type1 = ["trigo", "function", "limit", "probability"];
const diff1 = ["easy", "medium", "hard"];
const review = [true,false];

const getRandom = (arr) => Math.floor(Math.random() * arr.length);

for (let i = 1; i <= 50; i++) {
  const desc = `this is ques ${i}`;
  const corrAns = opt[getRandom(opt)];
  const difficulty = diff1[getRandom(diff1)];
  const level = level1[getRandom(level1)];
  const type = type1[getRandom(type1)];

  data.push({
    id: i,
    desc,
    opt: ["opt A", "opt B", "opt C", "opt D"],
    corrAns,
    difficulty,
    level,
    type,
    isReviewed:review[getRandom(review)]
  });
  data.push();
}
console.log(data);
