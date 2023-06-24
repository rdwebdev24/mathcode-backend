// // random questions forming code //
// const data = [];
// const opt = ["opt A", "opt B", "opt C", "opt D"];
// const level1 = ["9th", "10th", "11th", "12th"];
// const type1 = ["trigo", "function", "limit", "probability"];
// const diff1 = ["easy", "medium", "hard"];
// const review = [true,false];

// const getRandom = (arr) => Math.floor(Math.random() * arr.length);

// for (let i = 1; i <= 50; i++) {
//   const desc = `this is ques ${i}`;
//   const corrAns = opt[getRandom(opt)];
//   const difficulty = diff1[getRandom(diff1)];
//   const level = level1[getRandom(level1)];
//   const type = type1[getRandom(type1)];

//   data.push({
//     id: i,
//     desc,
//     opt: ["opt A", "opt B", "opt C", "opt D"],
//     corrAns,
//     difficulty,
//     level,
//     type,
//     isReviewed:review[getRandom(review)]
//   });
//   data.push();
// }
// console.log(data);

// const arr = [
//     {
//       id: 1,
//       desc: 'this is ques 1',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'medium',
//       level: '9th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 2,
//       desc: 'this is ques 2',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'medium',
//       level: '12th',
//       type: 'limit',
//       isReviewed: false
//     },
//     {
//       id: 3,
//       desc: 'this is ques 3',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'medium',
//       level: '10th',
//       type: 'probability',
//       isReviewed: false
//     },
//     {
//       id: 4,
//       desc: 'this is ques 4',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'hard',
//       level: '10th',
//       type: 'probability',
//       isReviewed: true
//     },
//     {
//       id: 5,
//       desc: 'this is ques 5',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'hard',
//       level: '9th',
//       type: 'probability',
//       isReviewed: false
//     },
//     {
//       id: 6,
//       desc: 'this is ques 6',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'hard',
//       level: '12th',
//       type: 'function',
//       isReviewed: false
//     },
//     {
//       id: 7,
//       desc: 'this is ques 7',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'medium',
//       level: '9th',
//       type: 'trigo',
//       isReviewed: false
//     },
//     {
//       id: 8,
//       desc: 'this is ques 8',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'hard',
//       level: '11th',
//       type: 'function',
//       isReviewed: false
//     },
//     {
//       id: 9,
//       desc: 'this is ques 9',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '12th',
//       type: 'trigo',
//       isReviewed: false
//     },
//     {
//       id: 10,
//       desc: 'this is ques 10',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '11th',
//       type: 'function',
//       isReviewed: false
//     },
//     {
//       id: 11,
//       desc: 'this is ques 11',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'medium',
//       level: '9th',
//       type: 'probability',
//       isReviewed: true
//     },
//     {
//       id: 12,
//       desc: 'this is ques 12',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'hard',
//       level: '10th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 13,
//       desc: 'this is ques 13',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'easy',
//       level: '9th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 14,
//       desc: 'this is ques 14',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'medium',
//       level: '10th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 15,
//       desc: 'this is ques 15',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'medium',
//       level: '11th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 16,
//       desc: 'this is ques 16',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'medium',
//       level: '10th',
//       type: 'probability',
//       isReviewed: false
//     },
//     {
//       id: 17,
//       desc: 'this is ques 17',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'easy',
//       level: '12th',
//       type: 'limit',
//       isReviewed: true
//     },
//     {
//       id: 18,
//       desc: 'this is ques 18',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'medium',
//       level: '10th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 19,
//       desc: 'this is ques 19',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'hard',
//       level: '11th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 20,
//       desc: 'this is ques 20',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'hard',
//       level: '11th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 21,
//       desc: 'this is ques 21',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'hard',
//       level: '11th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 22,
//       desc: 'this is ques 22',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'hard',
//       level: '11th',
//       type: 'function',
//       isReviewed: false
//     },
//     {
//       id: 23,
//       desc: 'this is ques 23',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'medium',
//       level: '12th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 24,
//       desc: 'this is ques 24',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'medium',
//       level: '12th',
//       type: 'function',
//       isReviewed: false
//     },
//     {
//       id: 25,
//       desc: 'this is ques 25',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'easy',
//       level: '9th',
//       type: 'probability',
//       isReviewed: false
//     },
//     {
//       id: 26,
//       desc: 'this is ques 26',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'hard',
//       level: '10th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 27,
//       desc: 'this is ques 27',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'easy',
//       level: '10th',
//       type: 'limit',
//       isReviewed: false
//     },
//     {
//       id: 28,
//       desc: 'this is ques 28',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'medium',
//       level: '12th',
//       type: 'limit',
//       isReviewed: true
//     },
//     {
//       id: 29,
//       desc: 'this is ques 29',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'hard',
//       level: '9th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 30,
//       desc: 'this is ques 30',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '12th',
//       type: 'limit',
//       isReviewed: false
//     },
//     {
//       id: 31,
//       desc: 'this is ques 31',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'hard',
//       level: '12th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 32,
//       desc: 'this is ques 32',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'hard',
//       level: '12th',
//       type: 'limit',
//       isReviewed: true
//     },
//     {
//       id: 33,
//       desc: 'this is ques 33',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'easy',
//       level: '9th',
//       type: 'trigo',
//       isReviewed: false
//     },
//     {
//       id: 34,
//       desc: 'this is ques 34',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'hard',
//       level: '9th',
//       type: 'probability',
//       isReviewed: false
//     },
//     {
//       id: 35,
//       desc: 'this is ques 35',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'hard',
//       level: '9th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 36,
//       desc: 'this is ques 36',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'hard',
//       level: '9th',
//       type: 'trigo',
//       isReviewed: false
//     },
//     {
//       id: 37,
//       desc: 'this is ques 37',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '12th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 38,
//       desc: 'this is ques 38',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'medium',
//       level: '11th',
//       type: 'limit',
//       isReviewed: true
//     },
//     {
//       id: 39,
//       desc: 'this is ques 39',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt D',
//       difficulty: 'medium',
//       level: '12th',
//       type: 'probability',
//       isReviewed: true
//     },
//     {
//       id: 40,
//       desc: 'this is ques 40',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'medium',
//       level: '10th',
//       type: 'limit',
//       isReviewed: false
//     },
//     {
//       id: 41,
//       desc: 'this is ques 41',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'medium',
//       level: '12th',
//       type: 'function',
//       isReviewed: false
//     },
//     {
//       id: 42,
//       desc: 'this is ques 42',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '12th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 43,
//       desc: 'this is ques 43',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'hard',
//       level: '12th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 44,
//       desc: 'this is ques 44',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'easy',
//       level: '12th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 45,
//       desc: 'this is ques 45',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt B',
//       difficulty: 'easy',
//       level: '10th',
//       type: 'trigo',
//       isReviewed: false
//     },
//     {
//       id: 46,
//       desc: 'this is ques 46',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '11th',
//       type: 'limit',
//       isReviewed: false
//     },
//     {
//       id: 47,
//       desc: 'this is ques 47',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '9th',
//       type: 'function',
//       isReviewed: true
//     },
//     {
//       id: 48,
//       desc: 'this is ques 48',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'hard',
//       level: '9th',
//       type: 'trigo',
//       isReviewed: true
//     },
//     {
//       id: 49,
//       desc: 'this is ques 49',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt C',
//       difficulty: 'easy',
//       level: '10th',
//       type: 'limit',
//       isReviewed: true
//     },
//     {
//       id: 50,
//       desc: 'this is ques 50',
//       opt: [ 'opt A', 'opt B', 'opt C', 'opt D' ],
//       corrAns: 'opt A',
//       difficulty: 'easy',
//       level: '10th',
//       type: 'limit',
//       isReviewed: true
//     }
// ]

// const filters = [ "easy" , "probability" , "9th"]

// const a = arr.filter((item)=>{
//    return (filters.includes(item.difficulty) && filters.includes(item.type) && filters.includes(item.level))
// })

// console.log(arr.length);
// console.log(a);