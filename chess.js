const ChessPiecesObject = document.getElementsByClassName("ChessPiece");
let ChessPieces = Object.values(ChessPiecesObject);

const Rook = document.getElementById("Test");
const gridbox = document.getElementById("GridBox")
//Rook.style.zIndex = 100;


function removeChessPiece(chessPiece) {
  console.log(typeof ChessPieces);
  console.log(ChessPieces.length);
  
  const index = ChessPieces.indexOf(chessPiece);
  
  chessPiece.style.gridArea = "A10";
  chessPiece.style.display = "none";
  
  
  console.log(ChessPieces.length);
}

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
    let Dots = document.getElementsByClassName("Dot");

    for (let i =0; i<Dots.length; i++){
      if (Dots[i].style.gridArea == location){
        imgs = Dots[i].children;
        img = imgs[0];
        if (img.className == "Red"){
          let nothing,Targetbutton = IsTileOccupied(location,button);
          removeChessPiece(Targetbutton);
        }
        button.style.gridArea = location;
      }
    }


}


function AddDot(location,button){
  console.log(location);

  if (location[1] == 0 || location[1] >= 9){
    console.log("BRuh is " + location[1].toString())
    return; 
  }

  

  let dot = document.createElement("button");
  dot.style.gridArea = location; 
  dot.className = "Dot";
  
  let img = document.createElement("img");
  if (!IsTileOccupied(location,button)){
    img.src = "Chess Pieces/BestDot-Photoroom.png";
    img.className = "Gray";
    console.log("Img is now dot");
  }
  else{
    console.log(button);
    let nothing,targetbutton = IsTileOccupied(location,button);
    if (targetbutton == true){
      console.log("Targerbutton was true");
      return;
    }
    console.log(targetbutton);
    let Targettext = GetChessPiece(targetbutton);
    let Targetcolor = ""
    for (let i = 0;i<5;i++){
      Targetcolor += Targettext[i];
    }

    let text = GetChessPiece(button);
    let color = ""

    for (let i=0; i<5; i++){
      color += text[i];
    }

    console.log(Targetcolor);
    console.log(color);

    if (!(color == Targetcolor)){
      console.log("YO we made a RedCircle!!");
      img.src = "Chess Pieces/RedCircle-Photoroom.png";
      img.className = "Red";
    }
    else{
     return; 
    }
  }
  console.log("We added dot")

  console.log(location);
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
        return false,ChessPieces[i];
      }
      else{
        console.log("ChessPieces[i] isn't button");
        console.log(location);
        return true,ChessPieces[i];
      }
    }    
  }
  return false;
}

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
      if ( (!(CurrentColumn.toString() == InitalColumn)) || (CurrentColumn == ColumnsLetters[7]) ){
        console.log(i);
        break;
      }
    }
  }

  CurrentColumn = InitalColumn;
  i = ColumnsLetters.indexOf(CurrentColumn);

  while (true){
    CurrentColumn = ColumnsLetters[i];
    location = CurrentColumn + InitalRow;
    if (!(CurrentColumn == InitalColumn)){
      //location = CurrentColumn + InitalRow;
      AddDot(location,button);
    }
    i -= 1;
    if ((CurrentColumn == ColumnsLetters[0]) || (IsTileOccupied(location,button))){
      if ((!(CurrentColumn.toString() == InitalColumn) || (CurrentColumn == ColumnsLetters[0]))){
        console.log(i);
        break;
      }
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
      AddDot(location,button);
    }
    i += 1;
    if ((CurrentRow >= 8) || (IsTileOccupied(location,button))){
      if ((!(CurrentRow.toString() == InitalRow)) || (CurrentRow >= 8)){
        console.log(i);
        console.log(IsTileOccupied(location,button));
        break;
      }

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
      AddDot(location,button);
    }
    i -= 1;
    if ((CurrentRow <= 0) || (IsTileOccupied(location,button))){
      if ((!(CurrentRow.toString() == InitalRow)) || (CurrentRow <= 0)){
        console.log(i);
        console.log(CurrentRow);
        console.log(IsTileOccupied(location,button));
        break;
      }
    }
  }

}



// function CheckDiagonal(InitalColumn,InitalRow,button){ // still needs work 
//   let CurrentColumn = InitalColumn;
//   let CurrentRow = Number(InitalRow);
  
//   let Ci = CurrentRow;
//   let Ri = ColumnsLetters.indexOf(CurrentColumn);
//   let location;
//   while (true){
//     CurrentRow = Ci;
//     CurrentColumn = ColumnsLetters[Ri];
//     location = CurrentColumn.toString() + CurrentRow.toString();
//     if (!(CurrentRow.toString() == InitalRow) && !(CurrentColumn == InitalColumn)){
      
//       // let locationRow = CurrentRow + 1;
//       // locationRow = locationRow.toString();

//       //location = InitalColumn + CurrentRow;
//       AddDot(location);
//     }
//     Ri += 1;
//     Ci += 1;
//     if ((CurrentRow >= 8) || (CurrentColumn == ColumnsLetters[7]) || (IsTileOccupied(location,button))){
//       console.log("Yay we break");
//       break;
//     }
//   }

//   CurrentColumn = InitalColumn;
//   CurrentRow = Number(InitalRow);
//   Ci = CurrentRow;
//   Ri = ColumnsLetters.indexOf(CurrentColumn);
//   while (true){
//     CurrentRow = Ci;
//     CurrentColumn = ColumnsLetters[Ri];
//     console.log(CurrentColumn);
//     console.log(CurrentRow);
//     location = CurrentColumn.toString() + CurrentRow.toString();
//     if (!(CurrentRow.toString() == InitalRow) && !(CurrentColumn == InitalColumn)){
//       // let locationRow = CurrentRow + 1;
//       // locationRow = locationRow.toString();

//       //location = InitalColumn + CurrentRow;
//       AddDot(location);
//     }
//     Ri -= 1;
//     Ci -= 1;
//     if ((CurrentRow <= 0) || (CurrentColumn == ColumnsLetters[0]) || (IsTileOccupied(location,button))){
//       break;
//     }
//   }
// }

function CheckDiagonal(InitalColumn,InitalRow,button){ 
  for (let i=0;i<4;i++){
    let CurrentColumn = InitalColumn;
    let CurrentRow = Number(InitalRow);
    
    let Ri = CurrentRow;
    let Ci = ColumnsLetters.indexOf(CurrentColumn);
    let location;
    while (true){
      CurrentRow = Ri;
      CurrentColumn = ColumnsLetters[Ci];
      location = CurrentColumn.toString() + CurrentRow.toString();
      console.log(location);
      if (!(CurrentRow.toString() == InitalRow) && !(CurrentColumn == InitalColumn)){
        
        // let locationRow = CurrentRow + 1;
        // locationRow = locationRow.toString();
  
        //location = InitalColumn + CurrentRow;
        console.log("Diagonal dot may be created!");
        AddDot(location,button);
      }
      let RiPostive;
      let CiPostive;

      switch (i){
        case 0:
          Ri += 1;
          Ci += 1;

          RiPostive = true;
          CiPostive = true;
          break;
        case 1:
          Ri -= 1;
          Ci += 1;

          RiPostive = false;
          CiPostive = true;
          break;
        case 2:
          Ri += 1;
          Ci -= 1;

          RiPostive = true;
          CiPostive = false;
          break;
        case 3:
          Ri -= 1;
          Ci -= 1;

          RiPostive = false;
          CiPostive = false;
          break;
        default:
          console.warn("AYOOOOO");
          return;
      }

      if (RiPostive){
        if (CurrentRow >= 8){
          break;
        }
      }
      else{
        if (CurrentRow <= 0){
          break;
        }
      }

      if (CiPostive){
        if(CurrentColumn == ColumnsLetters[7]){
          break;
        }
      }
      else{
        if(CurrentColumn == ColumnsLetters[0]){
          break;
        }
      }

      if(IsTileOccupied(location,button)){
        if (!(CurrentRow.toString() == InitalRow) && !(CurrentColumn == InitalColumn)){
          break;
        }
      }
    }
  }
}

function CheckKnightMove(InitalColumn,InitalRow,button){

  let CurrentColumn = InitalColumn;
  let CurrentRow = Number(InitalRow);

  let location;

  let Ri = CurrentRow;
  let Ci = ColumnsLetters.indexOf(CurrentColumn);

  const KnightMovesR = [2,2,1,-1,-2,-2,1,-1];
  const KnightMovesC = [1,-1,2,2,-1,1,-2,-2];

  function Reset(){
    CurrentColumn = InitalColumn;
    CurrentRow = Number(InitalRow);
  
    Ri = CurrentRow;
    Ci = ColumnsLetters.indexOf(CurrentColumn);
  }

  for (let i = 0; i<8;i++){
    console.log(i);
    Reset();
    console.log(Ci);

    Ri += KnightMovesR[i];
    Ci += KnightMovesC[i];

    CurrentRow = Ri;
    CurrentColumn = ColumnsLetters[Ci];

    if (Ci < 0 || Ri < 0){
      continue
    }
    if (CurrentColumn == undefined){
      console.log("Currentcolumn no exist");
      continue;
      
    }

    console.log(Ci);
    location = CurrentColumn.toString() + CurrentRow.toString();


    if (CurrentRow >= 9 || CurrentRow <= -1){
      console.log("It out of bounce");
      continue;
    }
    console.log("YAY WE ADD DOT!!")
    AddDot(location,button);



  }
}

function CheckPawnMove(InitalColumn,InitalRow,button){
  let CurrentColumn = InitalColumn;
  let CurrentRow = Number(InitalRow);

  let location;

  let Ri = CurrentRow;
  let Ci = ColumnsLetters.indexOf(CurrentColumn);

  let text = GetChessPiece(button);

  let piece = "";

  for (let i=0; i<5;i++){
    piece += text[i];
  }


  let PawnMovesR;
  let PawnMovesC;
  switch (piece){
    case "Black":
      PawnMovesR = [-1,-1,-1,-2];
      PawnMovesC = [0,1,-1,0];
      break;
    case "White":
      PawnMovesR = [1,1,1,2];
      PawnMovesC = [0,1,-1,0];
      break;
    default:
      console.warn("No color dectected")
      return;
  }



  function Reset(){
    CurrentColumn = InitalColumn;
    CurrentRow = Number(InitalRow);
  
    Ri = CurrentRow;
    Ci = ColumnsLetters.indexOf(CurrentColumn);
  }

  for (let i = 0; i<4;i++){
    console.log(i);
    Reset();
    console.log(Ci);

    Ri += PawnMovesR[i];
    Ci += PawnMovesC[i];


    CurrentRow = Ri;
    CurrentColumn = ColumnsLetters[Ci];

    if (Ci < 0 || Ri < 0){
      continue
    }
    if (CurrentColumn == undefined){
      continue;
    }

    console.log(Ci);
    location = CurrentColumn.toString() + CurrentRow.toString();

    switch (i){
      case 0:
        if (!IsTileOccupied(location,button)){
          AddDot(location,button);
        }
        break;
      case 3:
        if ((!IsTileOccupied(location,button)) && ((InitalRow == 2) || (InitalRow == 7))){
          AddDot(location,button);
        }

        break;
      default:
        if (IsTileOccupied(location,button)){
          AddDot(location,button);
        }
        break;
    }

    if (CurrentRow >= 9 || CurrentRow <= -1){
      continue;
    }
    //AddDot(location);



  }

}

function CheckKingMove(InitalColumn,InitalRow,button){
  let CurrentColumn = InitalColumn;
  let CurrentRow = Number(InitalRow);

  let location;

  let Ri = CurrentRow;
  let Ci = ColumnsLetters.indexOf(CurrentColumn);

  let KingMovesR = [0,1,-1,1,1,0,-1,-1];
  let KingMovesC = [1,1,1,0,-1,-1,-1,0];

  function Reset(){
    CurrentColumn = InitalColumn;
    CurrentRow = Number(InitalRow);
  
    Ri = CurrentRow;
    Ci = ColumnsLetters.indexOf(CurrentColumn);
  }


  for (let i=0; i<8; i++){
    Reset();
      
    Ri += KingMovesR[i];
    Ci += KingMovesC[i];

    CurrentRow = Ri;
    CurrentColumn = ColumnsLetters[Ci];

    if (Ci < 0 || Ri < 0){
      continue
    }
    if (CurrentColumn == undefined){
      continue;
    }

    location = CurrentColumn.toString() + CurrentRow.toString();

    AddDot(location,button);

    if (CurrentRow >= 9 || CurrentRow <= -1){
      continue;
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
      CheckColumn(InitalColumn,InitalRow,button);
      CheckRow(InitalColumn,InitalRow,button);
      CheckDiagonal(InitalColumn,InitalRow,button);
      break;      
    case "King":
      CheckKingMove(InitalColumn,InitalRow,button);
      break;
    case "Rook":
      CheckColumn(InitalColumn,InitalRow,button);
      CheckRow(InitalColumn,InitalRow,button);
      break;
    case "Bishop":
      CheckDiagonal(InitalColumn,InitalRow,button);
      break;
    case "Knight":
      CheckKnightMove(InitalColumn,InitalRow,button);
      break;
    case "Pawn":
      CheckPawnMove(InitalColumn,InitalRow,button);
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
    console.log("ChessAct");
    console.log(this);
    if (ChessPieces[i] == undefined){
      console.log("Was underfeinded")
      return;
    }
    let Symbol = GetChessPiece(ChessPieces[i]);
    AddDots(ChessPieces[i],Symbol)
    ChessPieces[i].style.backgroundColor  = "yellow";

    
    setTimeout(function(){
      gridbox.addEventListener("click" ,function(event) {
        console.log("CLick func");
        ChessPieces[i].style.backgroundColor  = "transparent";
        event.preventDefault();
        MoveChessPiece(ChessPieces[i]);
        RemoveAllDots();

        gridbox.removeEventListener("click",arguments.callee);
        console.log("Event removed!!")
      },{ once: true }) 
    },100);


  })
}
