class Meditation {
    constructor(private times: number) {}

    start () {
        let interval = setInterval(() => {
            console.log(this.times);
            this.times--;
            
            if (this.times == 0) {
                clearInterval(interval);
                console.log("Jay Guru Dev");
            }
        }, 1000);
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);