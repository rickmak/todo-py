import { $ } from "./tools.js";
import { List } from "./src/model.js";
import TodoApp from "./src/app.js";

const appContainer = $("list-content");
const taskList = new List("Inbox");
taskList.load();
const app = new TodoApp(taskList);
app.render(appContainer);

console.debug("boot");
