const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CONVAS_SIZE = 700;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

//strokestyle은 어떤색으로 나타낼건지.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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

function handleColor(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e) {
    const size = e.target.value
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleConvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE);
    }
}

//우클릭 방지 contextmenu는 우클릭할때의 창이 뜨는걸 말함.
function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);  //클릭했을때의 이벤트
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleConvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}