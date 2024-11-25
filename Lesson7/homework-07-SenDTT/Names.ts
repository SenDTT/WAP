import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import events from "node:events";
import { nanoid } from "nanoid";

const pathToFile = join("data.json");

interface NameObj {
  readonly id: string;
  name: string;
}

export default class Names extends events {
  #fileContent: NameObj[] = [];
  constructor() {
    super();
    this.#fileContent = JSON.parse(readFileSync(pathToFile, "utf-8"));
  }

  persist = () => {
    writeFileSync(pathToFile, JSON.stringify(this.#fileContent));

    this.emit("data_saved", { ok: 1 });
  };

  addName = (name: string) => {
    this.#fileContent.push({
      id: nanoid(),
      name,
    });

    this.persist();
  };

  getNames = () => {
    return this.#fileContent;
  };

  getNameById = (id: string) => {
    return this.#fileContent.find((obj) => obj.id === id);
  };

  updateNameById = (id: string, new_name: string) => {
    const obj = this.getNameById(id);

    if (obj) {
      obj.name = new_name;
      this.#fileContent = Array.from([...this.#fileContent]);
      this.persist();
    }

    this.emit("data_updated", { ok: !obj ? 0 : 1 });
  };

  deleteNameById = (id: string) => {
    const obj = this.getNameById(id);

    if (obj) {
      this.#fileContent = Array.from([
        ...this.#fileContent.filter((item) => item.id !== id),
      ]);
      this.persist();
    }

    this.emit("data_deleted", { ok: !obj ? 0 : 1 });
  };
}
