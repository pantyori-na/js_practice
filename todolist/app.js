const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const inputs = document.querySelectorAll('input[type="checkbox"]');
const checkElement = document.getElementById("check");

(function () {
  console.log('即時関数');
  // 初期化処理
  // ローカルストレージに格納されている値を取得し、リストを生成する
  for (var key in localStorage) {
    // 勝手にロードするとclientIdが保存されてしまっていたので出力させない
    if (!(key.includes("ClientId") || key.includes("inputs"))) {
      var Data = JSON.parse(localStorage.getItem(key));
      if (Data) {
        var html = Data.html;
        var status = Data.status;
        if (html) {
          list.innerHTML += html;
        }
        if (status) {

        }
      }
    }
  }
})();


const createTodoList = task => {
  // HTML テンプレートを生成
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <input type="checkbox" id ="check"><span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

  var Data = {
    html: html,
    status: false
  };

  list.innerHTML += Data.html;
  saveTaskTolocalStorage(task, Data);
}

// taskの保存
const saveTaskTolocalStorage = (task, Data) => {
  // nullはlocalStorageに保存しない
  if (Data.html) {
    // localStorageは0から始まる
    localStorage.setItem(task, JSON.stringify(Data));
    return;
  }
  return;
}


// ====オリジナル追加======
// checkboxがクリックされたら横線をいれる
list.addEventListener('click', e => {

  if (e.target.nodeName === 'INPUT') {
    var key = e.target.parentElement.textContent.trim();
    var Data = JSON.parse(localStorage.getItem(key));
    // checkboxの次の要素がspanタグ
    var spanClass = e.target.nextSibling.classList;
    spanClass.toggle('done');
    checkboxToLocalStorage(key, spanClass, Data);
  }
});

// checkboxの保存
const checkboxToLocalStorage = (key, spanClass, Data) => {

  if (spanClass.value === "done") {
    Data.status = true;
  } else {
    Data.status = false;
  }

  localStorage.setItem(key, JSON.stringify(Data));
}


// checkboxの呼び出し
const checkboxLoad = () => {



  // let inputs = JSON.parse(localStorage.getItem('inputs'));
  // if (inputs) {
  //   inputs.forEach((input) => {
  //     document.getElementById(input.id).checked = input.checked;
  //   });
  // }
}

// 削除の保存機能
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
    checkboxToLocalStorage();
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