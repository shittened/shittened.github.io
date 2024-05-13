var start_menu = document.getElementById('start-menu');
var time = document.getElementById('time');
var win = document.getElementById('window');
var start_menu_hidden = true;
var await_open_win = false;

start_menu.style.visibility = 'hidden';

function ToggleStart() {
    if (start_menu_hidden) {
        start_menu.style.visibility = 'visible';
        start_menu_hidden = false;
    }
    else {
        start_menu.style.visibility = 'hidden';
        start_menu_hidden = true;
    }
}

function RefreshTime() {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    var time_now = hour + ":" + min;
    time.innerHTML = time_now;
}

setInterval(RefreshTime, 1000);

//start_menu.contentWindow.document.getElementById("farting").addEventListener("click", ToggleStart(), false);

function Fart() {
    await_open_win = true;
    console.log(await_open_win);
}

function CheckAwaitOpenWin() {
    if (await_open_win) {
        console.log(await_open_win);
    }
}

setInterval(CheckAwaitOpenWin, 1000);
