// let data = document.getElementById('data').innerText;
// let hindi = document.getElementById('hindi');
// let ENGLISH = document.getElementById('english');
// let next = document.getElementById('next');
// let score = document.getElementById('score');
// let score_inp = document.getElementById('score_inp');
// let help = document.getElementById('help');
// let struct = document.getElementById('struct');


// data = JSON.parse(data);
// let index;
// let clear;


// let submit = document.getElementById("submit");
// let question = document.getElementById("tq");
// let question_inp = document.getElementById("tq_inp");

// const timer = () => {
//     let timer = document.getElementById("timer");

//     let count = 0;
//     clear = setInterval(() => {
//         if (count <= 30) {
//             timer.innerHTML = count++;

//         }
//         else {
//             get();

//         }
//     }, 1000)

// }

// help.addEventListener("click", () =>{
// struct.style.display = "block";
// })

// const get = () => {
//     struct.style.display = "none";
//     clearInterval(clear);
//     const ran = Math.random() * 18;
//     const num = Math.floor(ran);
//     index = num;

//     hindi.innerText = data[num].hindi;
//     struct.innerText = data[num].struct;
//     timer();
// }

// get();




// next.addEventListener("click", () => {
//     question_inp.value++;
//     question.innerText = question_inp.value; 
//     if (data[index].eng.toLowerCase() == ENGLISH.value.toLowerCase()) {
//         score_inp.value++;
//         score.innerText =score_inp.value;
//         console.log("Right Answer")
//     }
//     else {
//         console.log("Wrong Answer");
//     }
//     console.log(ENGLISH.value)
//     console.log(data[index].eng)
//     ENGLISH.value = "";


//     get()
// });