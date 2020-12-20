function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function plusZero(length, target, index) {
        if (length < 10) {
            target.textContent = `0${index}`;
        } else {
            target.textContent = index;
        }
    }

    function changeOpacity(arr, index) {
        arr.forEach(dot => dot.style.opacity = '.5');
        arr[index - 1].style.opacity = 1;
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function removeStr(i) {
        return +i.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == removeStr(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += removeStr(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        plusZero(slides.length, current, slideIndex);
        changeOpacity(dots, slideIndex);
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = removeStr(width) * (slides.length - 1);
        } else {
            offset -= removeStr(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        plusZero(slides.length, current, slideIndex);
        changeOpacity(dots, slideIndex);
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = removeStr(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            plusZero(slides.length, current, slideIndex);
            changeOpacity(dots, slideIndex);
        })
    })

}

export default slider;