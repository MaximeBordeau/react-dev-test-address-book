import localforage from "localforage";

const database = localforage.createInstance({
  name: "addressBook",
});

export default database;
