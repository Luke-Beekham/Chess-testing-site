const ChessPieces = document.getElementsByClassName("ChessPiece");
const Rook = document.getElementById("Test");
const gridbox = document.getElementById("GridBox")
Rook.style.zIndex = 100;

document.setAttraubte

function GetChessPiece(button){
    const imgs = button.querySelectorAll("img");
    const img = imgs[0];
    console.log(img);
    console.log(img.getAttribute('alt'));
    return img.getAttribute('alt');
}

let x = 0
let y = 0
function coordinate(event){
    x = event.pageX;
    y = event.pageY;
}

const ColumnsLetters = ["a","b","c","d","e","f","g","h"];
const ChessRows = [300,400,500,600,700,800,900,1000,1100];
const ChessColumns = [230,330,430,530,630,730,830,930,1030];

const ChessRowsKey = {
    300: "8", 400: "7", 500: "6", 600: "5", 700: "4", 800: "3", 900: "2", 1000: "1", 1100: "0",
  };

const ChessColumnsKey = {
  230: "a", 330: "b", 430: "c", 530: "d", 630: "e", 730: "f", 830: "g", 930: "h", 1030: "i"
}



function MoveChessPiece(button){
    console.log(x);
    console.log(y);
    let SavedRowI = undefined;
    let SavedColumnI = undefined;



    for (i=0;i<=ChessColumns.length;i++){
      if (x >= ChessColumns[i] && x < ChessColumns[i + 1] ){
        //console.log(ChessColumnsKey[ChessColumns[i]]);
        SavedColumnI = i;
        console.log("YOOO")
        console.log(SavedColumnI)
        break;
      }
    }

    for (i=0;i<=ChessRows.length;i++){
      if (y >= ChessRows[i] && y < ChessRows[i+ 1]){
        //console.log(ChessRowsKey[ChessRows[i]]);
        SavedRowI = i;
        console.log("YOOO")
        console.log(SavedRowI)
        break;
      }
    }

    let location = ChessColumnsKey[ChessColumns[SavedColumnI]] + ChessRowsKey[ChessRows[SavedRowI]];
    console.log(location)
    button.style.gridArea = location;
}


function AddDot(location,button){
  console.log(location);

  if (location[1] == 0){
    console.log("BRuh is 0")
    return; 
  }
  let dot = document.createElement("button");
  dot.style.gridArea = location; 
  dot.className = "Dot";
  
  let img = document.createElement("img");
  if (!IsTileOccupied(location,button)){
    img.src = "Chess Pieces/BestDot-Photoroom.png";
  }
  else{
    img.src = "Chess Pieces/RedCircle-Photoroom.png";
  }
  console.log("We added dot")


  dot.appendChild(img);

  gridbox.appendChild(dot);
  //console.log("YOO we dididid it")    

}

function IsTileOccupied(location,button){
  for (i=0;i<ChessPieces.length;i++){
    if ((ChessPieces[i].style.gridArea == location)){
      console.log(button);
      if (button == undefined){
        console.log("button is underfined");
        return true;  
      }
      else if(ChessPieces[i] == button){
        return false;
      }
      else{
        console.log("ChessPieces[i] isn't button");
        console.log(location);
        return true;
      }
    }    
  }
  return false;


}


// function CheckColumn(InitalColumn,InitalRow){
//   let CurrentColumn = 0;
//   //console.log("We found rook")
//   let i = 0;
//   while (true){
//     CurrentColumn = ColumnsLetters[i];
//     if (!(CurrentColumn == InitalColumn)){
//       let location = CurrentColumn + InitalRow;
//       AddDot(location);
//     }
//     i += 1;
//     if ((CurrentColumn == ColumnsLetters[7]) || (!IsTileOccupied(location))){
//       break;
//     }
//   }
// }

function CheckColumn(InitalColumn,InitalRow,button){
  let CurrentColumn = InitalColumn;
  //console.log("We found rook")
  let i = ColumnsLetters.indexOf(CurrentColumn);
  let location;
  while (true){
    CurrentColumn = ColumnsLetters[i];
    location = CurrentColumn + InitalRow;
    if (!(CurrentColumn == InitalColumn)){
      //location = CurrentColumn + InitalRow;
      AddDot(location,button);
    }
    i += 1;
    if ((CurrentColumn == ColumnsLetters[7]) || (IsTileOccupied(location,button))){
      console.log(i);
      break;
    }
  }

  CurrentColumn = InitalColumn;
  i = ColumnsLetters.indexOf(CurrentColumn);

  while (true){
    CurrentColumn = ColumnsLetters[i];
    location = CurrentColumn + InitalRow;
    if (!(CurrentColumn == InitalColumn)){
      //location = CurrentColumn + InitalRow;
      AddDot(location);
    }
    i -= 1;
    if ((CurrentColumn == ColumnsLetters[0]) || (IsTileOccupied(location,button))){
      console.log(i);
      break;
    }
  }
}


function CheckRow(InitalColumn,InitalRow,button){
  let CurrentRow = Number(InitalRow);
  console.log("intial row" + InitalRow);
  let i = CurrentRow;
  let location;
  while (true){
    CurrentRow = i;
    location = InitalColumn + CurrentRow;
    if (!(CurrentRow.toString() == InitalRow)){
      console.log("CurrentRow " + CurrentRow + " i: " + i);
      
      // let locationRow = CurrentRow + 1;
      // locationRow = locationRow.toString();

      //location = InitalColumn + CurrentRow;
      AddDot(location);
    }
    i += 1;
    if ((CurrentRow >= 8) || (IsTileOccupied(location,button))){
      console.log(i);
      console.log(IsTileOccupied(location,button));
      break;
    }

  }

  CurrentRow = Number(InitalRow);
  i = CurrentRow
  while (true){
    CurrentRow = i;
    location = InitalColumn + CurrentRow;
    if (!(CurrentRow.toString() == InitalRow)){
      // let locationRow = CurrentRow + 1;
      // locationRow = locationRow.toString();

      //location = InitalColumn + CurrentRow;
      AddDot(location);
    }
    i -= 1;
    if ((CurrentRow <= 0) || (IsTileOccupied(location,button))){
      console.log(i);
      console.log(CurrentRow);
      console.log(IsTileOccupied(location,button));
      break;
    }
  }

}



function CheckDiagonal(InitalColumn,InitalRow){ // still needs work 
  let CurrentRow = 0;
  let CurrentColumn = 0;
  let i = 0;
  while (true){
    CurrentRow = i;
    if (!(toString(CurrentRow) == InitalRow)){
      let locationRow = CurrentRow + 1;
      locationRow = locationRow.toString();

      let location = InitalColumn + locationRow;
      console.log(location);
      AddDot(location);
    }
    i += 1;
    if (( CurrentRow == 7) || (!IsTileOccupied(location))){
      break;
    }
  }
}

function AddDots(button,ChessPiece){
  let InitalLocation =  button.style.gridArea
  let InitalColumn = InitalLocation[0];
  let InitalRow = InitalLocation[1];
  
  let CurrentColumn = "a";
  let CurrentRow = "1"
  

  let Piece = "";

  for (i=5;i<ChessPiece.length;i++){
    Piece += ChessPiece[i];
  }

  switch (Piece) {
    case "Queen":
      
      break;
      
    case "King":
      break;

    case "Rook":
      CheckColumn(InitalColumn,InitalRow,button);
      CheckRow(InitalColumn,InitalRow,button)

      break;
    case "Bishop":
      break;
    case "Knight":
      break;
    case "Pawn":
      break;
    default:
      console.warn("No piece dected!");
      console.log(Piece);
      break;
  }
}

function RemoveAllDots(){
  let Dots = document.getElementsByClassName("Dot");
  while (!(Dots.length == 0)){
    for (i=0;i<Dots.length;i++){
      Dots[i].remove();
    }
  }
}


for (let i = 0; i < ChessPieces.length; i++) {
  ChessPieces[i].addEventListener('click',function(){
    console.log("ChessAct")
    let Symbol = GetChessPiece(ChessPieces[i]);
    AddDots(ChessPieces[i],Symbol)

    
    setTimeout(function(){
      gridbox.addEventListener("click" ,function(event) {
        event.preventDefault();
        MoveChessPiece(ChessPieces[i]);
        RemoveAllDots();

        gridbox.removeEventListener("click",arguments.callee);
        console.log("Event removed!!")
      },{ once: true }) 
    },100);


  })
}

