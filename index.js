var start_menu = document.getElementById('start-menu');
var time = document.getElementById('time');
var win = document.getElementById('window');
var start_menu_hidden = true;

start_menu.style.visibility = 'hidden';

document.cookie = "win_to_open=none; path=/"

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

function AwaitOpenWin() {
    var win_to_open = document.cookie.split('=')[1]
    if (win_to_open != 'none') {
        console.log(win_to_open)
    }
}

setInterval(AwaitOpenWin, 100);
