const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
class Timer{
    constructor(TIME_LIMIT){
        this.c = 1000;
        this.TIME_LIMIT = TIME_LIMIT;
        this.timePassed = 0;
        this.timeLeft = TIME_LIMIT;
        this.timerInterval = null;
        this.remainingPathColor = COLOR_CODES.info.color;
    }
    
    init() {
        document.getElementById("timer").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${this.remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${this.formatTime(
            this.timeLeft
        )}</span>
    </div>
    `;
    }

    reset(TIME_LIMIT){
        clearInterval(timer.timerInterval);
        this.c = 1000;
        this.TIME_LIMIT = TIME_LIMIT;
        this.timePassed = 0;
        this.timeLeft = TIME_LIMIT;
        this.remainingPathColor = COLOR_CODES.info.color;
    }

    onTimesUp() {
        if(!player.destination){
            document.getElementById('result').innerHTML = "You Lost :(";

        }
        clearInterval(this.timerInterval);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }
    startTimer() {
        this.timerInterval = setInterval(()=> {
            this.timePassed++;
            this.timeLeft = TIME_LIMIT - this.timePassed;

            document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
            this.setCircleDasharray();
            this.setRemainingPathColor(this.timeLeft);

            if (this.timeLeft === 0) {
                this.onTimesUp();
            }
        }, this.c);
    }


    setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    calculateTimeFraction() {
        const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
        return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
    }

    setCircleDasharray() {
        const circleDasharray = `${(
            this.calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }
}
