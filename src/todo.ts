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
  label.innerHTML = `
  <svg class="cross" width="700" height="70" viewBox="0 0 1000 100" style="position: absolute;">
  <g transform="translate(0,-972.36216)">
    <path d="m -50,1010 c 7,9 16,-43 20,-31 0.19,0.60 -7,35 -5,33 2,-2 26,-33 27,-32 3,3 -18,29 -12,32 12,6 20,-41 30,-31 7,7 -15,37 -6,31 9,-6 13,-22 23,-27 8,-4 -10,34 -2,28 2,-1 26,-28 30,-25 2,2 -11,16 -8,22 1,3 29,-17 29,-20 0,-7 -8,16 -4,23 3,6 21,-25 24,-25 6,0 -5,27 -2,21 4,-9 23,-33 23,-22 0,9 -16,28 -6,28 5,0 17,-14 21,-18 14,-15 11,-12 7,4 -0,3 -1,16 -1,12 0,-9 13,-24 21,-28 0,-0.36 -6,27 -2,28 9,3 26,-22 32,-28 5,-6 -3,29 3,25 5,-3 18,-27 26,-27 0.89,0 -9,22 -5,26 4,4 24,-17 29,-20 3,-1.63 -7,14 -4,18 2,2 16,-19 18,-21 1,-1 -9,24 7,11 4,-3 14,-15 21,-15 1,0 -17,37 -3,24 30,-28 -17,12 9,-10 23,-20 0.90,9 12,7 19,-4 16,-28 16,5 0,7 7,-17 15,-17 1,0 -1,17 -0.96,17 5,-2 14,-19 20,-19 1,0 -3,11 -1,13 5,6.1 19,-24 19,-16 0,1 -5,17 -3,17 1,0 12,-12 12,-11 0.50,2 -1,12 0.96,13 12,4 14,-30 14,-1 " fill="none" stroke="white" class="path2" stroke-width="3" />
  </g>
  </svg>`;
  const checkbox = document.createElement("input");
  const removeBtn = document.createElement("button");
  checkbox.className = "checkbox";
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  removeBtn.addEventListener("click", () => {
    removeTask(task);
    item.remove();
  });
  checkbox.checked = task.completed;
  checkbox.id = task.id;
  label.htmlFor = task.id;
  label.append( task.title);
  item.append(checkbox, label, removeBtn);
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