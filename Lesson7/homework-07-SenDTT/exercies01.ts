import Names from "./Names.ts";

let newName = new Names();
newName.on("data_saved", res => {
  if (res.ok === 1)
    console.log("Data has been saved to data.json successfully");
});

newName.addName("Sen Doan 2");

const allNames = newName.getNames();
console.log(allNames);

const lastId = allNames[allNames.length - 1].id;

console.log(newName.getNameById(lastId));

newName.on("data_updated", res => {
    if (res.ok === 1) console.log("Updated Successful");
    if (res.ok === 0) console.log("Updated Failed");
});
newName.updateNameById(lastId, "Thanh Sen");
console.log(newName.getNames());
newName.updateNameById("UcB5n1uyHXOQlDIqA5pUh", "Thi Thanh Sen Doan 2");
console.log(newName.getNames());

newName.on("data_deleted", res => {
    if (res.ok === 1) console.log("Deleted Successful");
    if (res.ok === 0) console.log("Deleted Failed");
});
newName.deleteNameById(lastId);
console.log(newName.getNames());
newName.deleteNameById("UcB5n1uyHXOQlDIqA5pUh");
console.log(newName.getNames());