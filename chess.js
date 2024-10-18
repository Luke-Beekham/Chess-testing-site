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
}

let x = 0
let y = 0
function coordinate(event){
    x = event.pageX;
    y = event.pageY;
}

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



for (let i = 0; i < ChessPieces.length; i++) {
  ChessPieces[i].addEventListener('click',function(){
    console.log("ChessAct")
    GetChessPiece(ChessPieces[i]);
    setTimeout(function(){
      gridbox.addEventListener("click" ,function(event) {
        event.preventDefault();
        MoveChessPiece(ChessPieces[i]);
        gridbox.removeEventListener("click",arguments.callee);
        console.log("Event removed!!")
      },{ once: true }) 
    },100);


  })
}

