const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const checkbox = document.getElementById('checkbox');

// localStorageへの保存
(function () {
  // 初期化処理
  // ローカルストレージに格納されている値を取得し、リストを生成する
  for (var key in localStorage) {

    // 勝手にロードするとclientIdが保存されてしまっていたので出力させない
    if (key.includes("ClientId")) {
      return;
    }
    var html = localStorage.getItem(key);

    if (html) {
      list.innerHTML += localStorage.getItem(key);
    }
  }
})();

const createTodoList = task => {
  // HTML テンプレートを生成
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <input type="checkbox" id="checkbox"><span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

  list.innerHTML += html;
  saveTaskTolocalStorage(task, html);
}

const saveTaskTolocalStorage = (task, html) => {
  // nullはlocalStorageに保存しない
  if (html) {
    // localStorageは0から始まる
    localStorage.setItem(task, html);
    return;
  }
  return;
}

const deleteTaskFromlocalStorage = task => {
  localStorage.removeItem(task);
  return;
}


// task追加機能
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

//　削除機能
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();

    const task = e.target.parentElement.textContent.trim();
    deleteTaskFromlocalStorage(task);
  }
});


const filterTasks = (term) => {


  Array.from(list.children)
    // フィルタ条件
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
  // 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす)
  const term = search.value.trim().toLowerCase();
  filterTasks(term);
});