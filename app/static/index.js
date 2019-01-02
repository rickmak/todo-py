import { $ } from "./tools.js";
import { List } from "./src/model.js";
import TodoApp from "./src/app.js";
import TodoArchive from "./src/archive.js";

const appContainer = $("list-content");
const taskList = new List("Inbox");
taskList.load();
const app = new TodoApp(taskList);
app.render(appContainer);

const archiveContainer = $("list-finished");
const archive = new TodoArchive(taskList);
archive.render(archiveContainer);

console.debug("boot");
