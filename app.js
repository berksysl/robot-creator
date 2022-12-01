//Gets slider container and puts into slider variable
const slider = document.querySelector('.slider-container');
//Converts slide node to array and assign it to slides variable
const slides = Array.from(document.querySelectorAll('.slide'));
const inputContainer = document.querySelector('.inputs');
const inputName = document.querySelector('#inputName');
const nextBtn = Array.from(document.querySelectorAll('.nextbtn'));
const previousBtn = Array.from(document.querySelectorAll('.previousbtn'));
const inputBoxes = Array.from(document.querySelectorAll('.inputBox'));
const controllers = Array.from(document.querySelectorAll('span'));
const colors = Array.from(document.querySelectorAll('input[type=radio]'));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0,
    curTranslate = 0;
    currentPos = 0;

AddEventListeners();

nextBtn.forEach((btn) => btn.addEventListener("click", function(){
    removeEventListeners();
    currentPos += 1;
    curTranslate -= window.innerWidth;
    inputContainer.style.transform = `translate(${curTranslate}px)`;
}));

previousBtn.forEach((btn) => btn.addEventListener("click", function(){
    currentPos -= 1;
    if(currentPos == 0){
        AddEventListeners();
    }
        curTranslate += window.innerWidth;
        inputContainer.style.transform = `translate(${curTranslate}px)`;
}))
     
function AddEventListeners(){
    slides.forEach((slide, index) => {
        //Gets images in slides
        const slideImage = slide.querySelector('img');
        //when dragstart event handled prevent the default act
        slide.addEventListener('dragstart', (e) => e.preventDefault())

        //Touch events
        let x = slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)

        //Mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    })

    controllers[0].addEventListener("click", prevSlide);
    if(currentIndex!=0){
        controllers[0].style.display = "flex";
    }
    else{
        controllers[0].style.display = "none";
    }
    controllers[1].addEventListener("click", nextSlide);
    if(currentIndex == 3)
    {
        controllers[1].style.display = "none";
    }
    else {
        controllers[1].style.display = "flex";
    }
}

function nextSlide() {
    currentIndex += 1;
    setPositionByIndex();
}

function prevSlide() {
    currentIndex -= 1;
    setPositionByIndex();
}

function touchStart(index) {
    return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        slider.classList.add("grabbing");
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.classList.remove("grabbing");
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - 1){
        currentIndex += 1;
    }
    if (movedBy > 100 && currentIndex > 0){
        currentIndex -= 1;
    }
    setPositionByIndex();
}

function touchMove(event) {
    if(isDragging){
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition()
    if(isDragging){
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
    if(currentIndex == 0){
        controllers[0].style.display = "none";
    }
    else {
        controllers[0].style.display = "flex";
    }
    if(currentIndex == 3) {
        controllers[1].style.display = "none";
    }
    else{
        controllers[1].style.display = "flex";
    }
}

function setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition()
}

/*Robot Creation*/
class Robot {
    constructor(name) {
        this.name = name;
        this.color = undefined;
        this.height = undefined;
    }
    
    setColor(color) {
        this.color = color;
    }

    setHeight(height) {
        this.height = height;
    }
}
let r1;
function selectRobot() {
    r1 = new Robot(inputName.value);
    removeEventListeners();
    //changing second inputBoxes's text content
    inputBoxes[1].children[0].innerHTML = `Paint the ${r1.name}`;
    inputBoxes[2].children[0].innerHTML = `Set height for ${r1.name}`;
}

function removeEventListeners() {
    slides.forEach((slide) => {
    slide.replaceWith(slide.cloneNode(true));
    });
    controllers[0].style.display = "none";
    controllers[1].style.display = "none";
}

function setColor() {

}

function setHeight() {

}

function drawRobot() {

}

