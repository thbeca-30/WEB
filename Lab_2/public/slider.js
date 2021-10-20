var offset = 0;
const sliderLine = document.querySelector('.slider-line');

document.querySelector('.btn.next').addEventListener('click', function(){
    offset = offset + 1450;
    if (offset > 4350) {
        offset = 0;
    }
    sliderLine.style.left = -offset + 'px';
});

document.querySelector('.btn.prev').addEventListener('click', function () {
    offset = offset - 1450;
    if (offset < 0) {
        offset = 4350;
    }
    sliderLine.style.left = -offset + 'px';
});