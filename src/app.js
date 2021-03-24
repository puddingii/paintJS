const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

//strokestyle은 어떤색으로 나타낼건지.
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    //path를 만들어야함. 누른시점부터 마우스를 땐 시점까지의 path
    if(!painting) {
        ctx.beginPath(); //경로생성
        ctx.moveTo(x,y);  //선 시작 좌표
    } else {
        ctx.lineTo(x, y);  //선 끝 좌표
        ctx.stroke();  // 선 그리기
    }
}

function onMouseDown(e) {
    painting = true;

}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);  //클릭했을때의 이벤트
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}