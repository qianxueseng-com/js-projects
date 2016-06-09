// function generateBoxes(n) {
//   var html = "";
//   var count = 1;
//   for (var i = 0; i < n; i++) {
//     html += '<div class="row">';
//     for (var j = 0; j < n; j++) {
//       html += '<div class="box">' + count + '</div>';
//       count += 1;
//     }
//     html += '</div>';
//   }
//   var grid = document.querySelector('#grid');
//   grid.innerHTML = html;
// }

/*===============================
 *Function Definitions
 *===============================
*/
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//generate a grid consisting of n*n boxes
function generateBoxes(n) {
  if (n > 31) {
    alert("Grid number should be no more than 31!");
    return;
  }
  var grid = document.querySelector('#grid');
  removeAllChildren(grid);

  var count = 1;
  for (var i = 0; i < n; i++) {
    //append rows to the grid
    var row = document.createElement('div');
    row.setAttribute("class", "row");
    for (var j = 0; j < n; j++) {
      //append boxes to a row
      var box = document.createElement('div');
      box.setAttribute("class", "box");
      box.textContent = count.toString();
      count += 1;
      row.appendChild(box);
    }
    grid.appendChild(row);
  }
}

//scale font-size of box according to its size
function scaleFontSize() {
  var box = document.querySelector('.box');
  var boxHeight = box.clientHeight;
  var grid = document.querySelector('#grid');
  grid.style.fontSize = String(boxHeight/1.5) + "px";
}


/*===============================
 *Scripts
 *===============================
*/
var inputBox = document.querySelector('#grid-number-input');
var btn = document.querySelector('button');
var grid = document.querySelector('#grid');

//generate Grid
inputBox.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { // key: "enter"
    generateBoxes(Number(inputBox.value));
    scaleFontSize();
  }
});

//generate Grid
btn.addEventListener("click", function() {
  generateBoxes(Number(inputBox.value));
  scaleFontSize();
});

//create hover effects
grid.addEventListener("mouseover", function(event) {
  if (event.target.className === "box") {
    event.target.style.color = "#6f1080";
  }
});

//create hover effects
grid.addEventListener("mouseout", function(event) {
  if (event.target.className === "box") {
    event.target.style.color = "#776165";
  }
});

//print the sequence number of a box when it's clicked
grid.addEventListener("click", function(event) {
  if (event.target.className === "box") {
    console.log(event.target.textContent);
  }
})

generateBoxes(Number(inputBox.value));
scaleFontSize();
