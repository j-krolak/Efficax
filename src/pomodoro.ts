
const timer = document.querySelector<HTMLDivElement>("#timer");
const startBtn = document.querySelector<HTMLButtonElement>("#start-timer");
const label = document.querySelector<HTMLDivElement>("#timer-label");
startBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    startTimer();
});

const workTime = 60 * 25;
const shortBreakTime =  60 * 5;
const longBreakTime = 60 * 30;

type Pomodoro = {
    time: number,
    workCount: number,
    isBreak: boolean,
    isPaused: boolean,
    notification: boolean
}

const pomodoro: Pomodoro = {
    time: workTime,
    workCount: 0,
    isBreak: false,
    isPaused: true,
    notification: false
};

function startTimer(){
    pomodoro.isPaused = !pomodoro.isPaused;
    if(startBtn)
        startBtn.innerHTML = pomodoro.isPaused ? "Start" : "Pause";
}

function secondsToString(seconds: number): string{

    return new Date(seconds * 1000).toISOString().slice(14, 19);
}
setInterval(() => {
    if(pomodoro.isPaused)
        return;


    pomodoro.time--;

    if(pomodoro.time <= 0){
        pomodoro.isPaused = true;
        if(!pomodoro.isBreak)
            pomodoro.workCount++;
        pomodoro.isBreak = !pomodoro.isBreak;
        
        if(pomodoro.isBreak) {
            if(pomodoro.notification)
                new Notification("Time for break!");
            if(pomodoro.workCount % 3 == 0){
                pomodoro.time = longBreakTime;
                if(label != undefined)
                    label.innerHTML = "Long brake";
            }
            else {
                pomodoro.time = shortBreakTime;
                if(label != undefined)
                    label.innerHTML = "Short brake";
            }
        }
        else {
            if(pomodoro.notification)
                new Notification("Time for work!");
            if(label != undefined){
                label.innerHTML = "Time for work";
            }

            pomodoro.time = workTime;
        }
    }

    if(timer != null)
        timer.innerHTML = secondsToString(pomodoro.time);
	document.title = secondsToString(pomodoro.time);

}, 1000);


if(label != undefined){
    label.innerHTML = "Time for work";
}
if(timer != null)
    timer.innerHTML = secondsToString(pomodoro.time);

Notification.requestPermission()
    .then((res) => {
        if(res === "granted"){
            pomodoro.notification = true;
        }
    })
    .catch((err) => {
    })
