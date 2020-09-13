const app = require("../index");
const syncDB = require("./sync-db");

syncDB().then(() => {
  console.log("Sync database !");
  app.listen(3000, () => {
    console.log("Server is running : 3000 !!!");
  });
});
