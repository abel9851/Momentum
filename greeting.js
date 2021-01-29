'use strict';

const form= document.querySelector(".js-form"),
input= form.querySelector("input"),
greeting= document.querySelector(".js-greetings");

const USER_LS = "currentUser",
SHOWING_CN ="showing";


function saveName (text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit (event) {
 /*
 여기서 매개변수는 envent객체를 인자로 받을 수 있다.
 여기서 이벤트 객체는 이벤트 객체 안에 있는 함수, 즉 매소드를 사용가능하다.
 또한 다른 객체 또한 인자로 받을 수 있다.(그때는 별도로 객체를 선언해야함.)
 */
    event.preventDefault();
    const currentValue = input.value;
    paintGreetings(currentValue);
    saveName (currentValue);
}

function askForName() {
form.classList.add(SHOWING_CN);
form.addEventListener("submit", handleSubmit);
}

function paintGreetings (text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `hello, ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        //she is not
        askForName();
    } else {
        // she is
        paintGreetings(currentUser);
    }
}

function init () {
 loadName();
}

init();