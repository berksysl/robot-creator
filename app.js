//Gets slider container and puts into slider variable
const slider = document.querySelector('.slider-container');
//Converts slide node to array and assign it to slides variable
const slides = Array.from(document.querySelectorAll('.slide'));

const inputName = document.querySelector('#inputName');

const inputBoxes = Array.from(document.querySelectorAll('.inputBox'));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

slides.forEach((slide, index) => {
    //Gets images in slides
    const slideImage = slide.querySelector('img');
    //when dragstart event handled prevent the default act
    slide.addEventListener('dragstart', (e) => e.preventDefault())

    //Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    //Mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove)
})

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

function selectRobot() {
    let r1 = new Robot(inputName.value);
    //changing second inputBoxes's text content
    inputBoxes[1].children[0].innerHTML += r1.name;
    
}

function setColor() {

}

function setHeight() {

}

function drawRobot() {

}