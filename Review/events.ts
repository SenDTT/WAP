import events from "node:events";
class ComproStudent extends events {
  constructor() {
    super();
  }

  triggerGraduation(year: number) {
    this.emit("graduation", year);
  }
}
const student = new ComproStudent();
student.on("graduation", (year) => console.log(`Congrats ${year} graduates.`));
student.triggerGraduation(2024);
