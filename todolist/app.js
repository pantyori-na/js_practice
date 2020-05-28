const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');

const createTodoList = task => {
  // HTML テンプレートを生成
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

  list.innerHTML += html;
}

addTask.addEventListener('submit', e => {
  // デフォルトのイベンドを無効
  e.preventDefault();

  //  タスクに入力した値を空白をtrimで消して格納
  const task = addTask.add.value.trim();

  if (task.length) {
    createTodoList(task);
    addTask.reset();
  }
});

list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});