const curriculum={
html:{label:"HTML",description:"HTML задаёт структуру и смысл содержимого страницы.",lessons:[
["Из чего состоит HTML-страница?","HTML — язык разметки. Он сообщает браузеру, где заголовок, абзац, изображение или ссылка.","<!doctype html>\n<html lang=\"ru\">\n<head><title>Мой сайт</title></head>\n<body>\n  <h1>Привет!</h1>\n</body>\n</html>","Создай заголовок h1 и абзац p в редакторе."],
["Заголовки и текст","Заголовки h1–h6 задают иерархию. Абзацы p подходят для обычного текста.","<h1>Главная тема</h1>\n<h2>Подраздел</h2>\n<p>Текст абзаца.</p>","Добавь один главный заголовок и два абзаца."],
["Ссылки и изображения","Ссылка использует href, а изображение — src и полезный alt.","<a href=\"https://example.com\">Открыть сайт</a>\n<img src=\"photo.jpg\" alt=\"Описание картинки\">","Добавь ссылку и изображение с осмысленным alt."],
["Списки и контейнеры","ul создаёт маркированный список, ol — нумерованный, li — его пункт.","<ul>\n  <li>Первый пункт</li>\n  <li>Второй пункт</li>\n</ul>","Собери список из трёх любимых игр, книг или фильмов."],
["Семантика и формы","header, main, section и footer помогают обозначить части страницы. label и input создают простую форму.","<main>\n  <section><h2>Контакты</h2>\n    <label>Имя <input type=\"text\"></label>\n  </section>\n</main>","Добавь на страницу main, section и поле ввода."]
]},
css:{label:"CSS",description:"CSS отвечает за внешний вид: цвета, размеры, расстояния и расположение.",lessons:[
["Как подключить CSS","CSS можно записать в отдельном файле и подключить через link внутри head.","<link rel=\"stylesheet\" href=\"style.css\">\n\n/* style.css */\nbody { font-family: Arial; }","Подключи style.css и задай странице шрифт."],
["Селекторы и цвета","Селектор выбирает элементы. Свойства внутри фигурных скобок задают оформление.","h1 {\n  color: #477b70;\n}\n.card {\n  background: #f1f4f5;\n}","Поменяй цвет заголовка и фон одного блока."],
["Размеры и отступы","margin — внешний отступ, padding — внутренний. border добавляет рамку.",".card {\n  padding: 20px;\n  margin: 16px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}","Оформи карточку: добавь отступы, рамку и скругление."],
["Flexbox","display:flex помогает расположить элементы в строку или колонку и управлять промежутками.",".menu {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}","Сделай горизонтальное меню из трёх ссылок."],
["Адаптивность","Медиазапрос меняет оформление на узком экране, например на телефоне.","@media (max-width: 600px) {\n  .menu { flex-direction: column; }\n}","Сделай так, чтобы меню становилось вертикальным на телефоне."]
]},
js:{label:"JavaScript",description:"JavaScript добавляет действия и реакции на события пользователя.",lessons:[
["Подключаем JavaScript","Скрипт подключается через script перед закрывающим body. Начинаем с небольших действий.","<button id=\"hello\">Нажми</button>\n<script src=\"script.js\"></script>","Добавь кнопку с id hello и подключи файл script.js."],
["Переменные","const хранит значение, которое не переназначают. let подходит для переменной, значение которой меняется.","const userName = \"Аня\";\nlet score = 0;\nscore = score + 1;","Создай переменную с именем и выведи её через console.log."],
["События","Событие click срабатывает, когда пользователь нажимает на элемент.","const button = document.querySelector('button');\nbutton.addEventListener('click', () => {\n  alert('Привет!');\n});","Добавь обработчик click, который меняет текст кнопки."],
["Условия","if позволяет выполнить код только при выполнении условия.","const age = 15;\nif (age >= 14) {\n  console.log('Можно продолжать');\n} else {\n  console.log('Попробуй позже');\n}","Проверь условием, равен ли счёт нулю."],
["Функции","Функция объединяет действия, которые можно запускать по имени.","function sayHello(name) {\n  return 'Привет, ' + name;\n}\nconsole.log(sayHello('Мир'));","Напиши функцию, которая принимает имя и возвращает приветствие."]
]}};
let activeModule="html",activeLesson=0;
const completed=new Set();
const $=id=>document.getElementById(id);
function renderLesson(){
 const mod=curriculum[activeModule],lesson=mod.lessons[activeLesson];
 $("lesson-title").textContent="Изучаем "+mod.label;
 $("lesson-description").textContent=mod.description;
 $("lesson-count").textContent="УРОК "+(activeLesson+1)+" / "+mod.lessons.length;
 $("lesson-tag").textContent=mod.label.toUpperCase()+" · ОСНОВЫ";
 $("current-title").textContent=lesson[0];$("current-text").textContent=lesson[1];$("current-code").textContent=lesson[2];$("current-task").textContent=lesson[3];
 $("lesson-list").innerHTML="";
 mod.lessons.forEach((item,index)=>{const b=document.createElement("button");b.type="button";b.textContent=(index+1)+". "+item[0];b.className=(index===activeLesson?"active ":"")+(completed.has(activeModule+index)?"done":"");b.addEventListener("click",()=>{activeLesson=index;renderLesson()});$("lesson-list").append(b)});
 $("prev-lesson").disabled=activeLesson===0;
 $("complete-lesson").textContent=activeLesson===mod.lessons.length-1?"Завершить модуль ✓":"Отметить и продолжить →";
}
function openModule(name){activeModule=name;activeLesson=0;renderLesson();$("lesson").scrollIntoView({behavior:"smooth"});}
document.querySelectorAll("[data-open-module]").forEach(b=>b.addEventListener("click",()=>openModule(b.dataset.openModule)));
$("prev-lesson").addEventListener("click",()=>{if(activeLesson>0){activeLesson--;renderLesson()}});
$("complete-lesson").addEventListener("click",()=>{completed.add(activeModule+activeLesson);if(activeLesson<curriculum[activeModule].lessons.length-1){activeLesson++}else{alert("Модуль "+curriculum[activeModule].label+" пройден. Отличная работа!")}renderLesson()});
const starter='<h1>Привет, мир!</h1>\n<p>Это мой первый сайт.</p>\n<button>Нажми на меня</button>';
function updatePreview(){const code=$("code-editor").value;const safe=code.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"");$("preview-frame").srcdoc="<!doctype html><html lang='ru'><meta charset='utf-8'><style>body{font:16px Arial,sans-serif;padding:24px;color:#253247}button{padding:9px 14px;border:0;border-radius:7px;background:#dce9e5;color:#294a42}</style><body>"+safe+"</body></html>"}
$("run-code").addEventListener("click",updatePreview);$("reset-code").addEventListener("click",()=>{$("code-editor").value=starter;updatePreview()});
renderLesson();updatePreview();