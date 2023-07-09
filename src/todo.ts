import { v4 as uuidV4 } from 'uuid'; 

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#title");
const tasks: Task[] = loadTasks();
tasks.forEach(addNewTask);

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createAt: Date
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if(!input || !list)
    return;
  if(input?.value == "")
    return;


  const task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createAt: new Date()
  };
  tasks.push(task);
  saveTasks();
  addNewTask(task);
  input.value = "";
});

function addNewTask(task: Task){
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const removeBtn = document.createElement("button");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = "❌";
  removeBtn.addEventListener("click", () => {
    removeTask(task);
    item.remove();
  });
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label, removeBtn);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem('TASKS');
  if(tasksJSON == null)
    return [];
  return JSON.parse(tasksJSON);  
}

function removeTask(task: Task) {
  tasks.splice(tasks.indexOf(task),1);
  saveTasks();
}