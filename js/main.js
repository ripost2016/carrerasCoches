// DATOS -------------------------------------------------------

// let circuito = {'width' : 900, 'height' : 600};

// let car1 = {'width' : 100, 'height' : 80, 'color' : 'red'};
// let car2 = {'width' : 100, 'height' : 80, 'color' : 'blue'};
// let car3 = {'width' : 100, 'height' : 80, 'color' : 'yellow'};

// let garage = [car1, car2, car3];

let finishLinePosition = document.querySelector('.finish-line').offsetLeft;

let intCar2, intCar3;

let countDownDelay = 3;

// LISTENERS ---------------------------------------------------

// let myCar = document.getElementById('car1');

let buttonGo = document.getElementById('go');
buttonGo.addEventListener('click', buttonStartHandler);

// HANDLERS ----------------------------------------------------

function buttonStartHandler() {
    launchRace();
}

function keyDownHandler(e) {
    console.log(e.key);

    if (e.key == 'ArrowRight') {
        moveCar('car1', 10);
        // moveCar('car2', 9);
        // moveCar('car3', 30);
    } else if (e.key == 'ArrowLeft') {
        moveCar('car1', -10);
        // moveCar('car2', -9);
        // moveCar('car3', -11);
    }
}

// FUNCTIONS ---------------------------------------------------

// function moveMyCar(pLong) {
//     let long = myCar.offsetLeft + pLong;
//     // console.log('longitud: ' + long);

//     myCar.style.left = long + 'px';
// }

function moveCar(pCarId, pDist) {
    let car = document.getElementById(pCarId);
    let dist = car.offsetLeft + pDist;

    for (let i = car.offsetLeft + 1; i <= dist; i++) {
        car.style.left = i + 'px';
        // console.log(car.style.left);
        // console.log(isCarWinner(car));

        if (isCarWinner(car)) {
            finishRace(car);
            return;
        }
    } 
}

function isCarWinner(pCar) {
    return (pCar.offsetLeft + pCar.offsetWidth - 1) >= finishLinePosition;
}

function finishRace(pCar) {
    document.body.removeEventListener('keydown', keyDownHandler);
    
    displayWinner(pCar);

    clearInterval(intCar2);
    clearInterval(intCar3);

    buttonGo.disabled = false;
}

function displayWinner(pCar) {
    let position = document.querySelector('footer');
    
    // position.style.opacity = '1';
    position.innerHTML = `<h2>El ganador es el ${pCar.dataset['marca']} </h2>`;
    position.querySelector('h2').style.color = pCar.dataset['color'];
}

function callMoveCar2() {
    moveCar('car2', 12);
}

function callMoveCar3() {
    moveCar('car3', 11);
}

function initRace() {
    document.body.addEventListener('keydown', keyDownHandler);

    // intCar2 = setInterval(()=>{moveCar('car2', 12);}, 200);
    intCar2 = setInterval(callMoveCar2, 200);
    intCar3 = setInterval(callMoveCar3, 200);
}

function initCarsPosition() {
    let car1 = document.getElementById('car1').style.left = '4px';
    let car2 = document.getElementById('car2').style.left = '4px';
    let car3 = document.getElementById('car3').style.left = '4px';
}

function countDown(pSeconds) {
    let count = pSeconds;
    
    let element = document.createElement('div');
    element.className = 'countDown';
    document.body.appendChild(element);

    setTimeout(function(){
        element.style.opacity = 1;
    }, 100);

    let intCount = setInterval(function(){
        element.innerHTML = '<p>' + count + '</p>';
        count--;
        if (count == 0) {
            clearInterval(intCount);
            element.style.opacity = 0;
            setTimeout(function(){
                document.body.removeChild(element);
            }, 500);
        }
    }, 1000);
}

function launchRace() {
    initCarsPosition();

    buttonGo.disabled = true;

    document.querySelector('footer').innerHTML = '';

    countDown(countDownDelay);
    let count = 0;

    let intRace = setInterval(function(){
        if (count == countDownDelay) {
            clearInterval(intRace);
            initRace()
        }
        count++;
    }, 1000);
}
