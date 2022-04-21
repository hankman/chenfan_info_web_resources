function parse_curr_date()
{
    let update_date_a = document.getElementsByClassName("date-link")[0];
    date_str = update_date_a.textContent
    if (!date_str) {
        return null;
    }
    y = parseInt(date_str);
    m = parseInt(date_str.slice(date_str.indexOf("年")+1));
    d = parseInt(date_str.slice(date_str.indexOf("月")+1));
    return new Date(y, m-1, d);
}


function refresh_update_date()
{
    up_date = parse_curr_date();
    if (up_date) {
        today = new Date();
        if (today.getYear() == up_date.getYear() &&
            today.getMonth() == up_date.getMonth() &&
            today.getDate() == up_date.getDate() + 1) {
                return;
            }
    }

    const xhttp_date = new XMLHttpRequest();
    xhttp_date.onload = function() {
        let update_date_a = document.getElementsByClassName("date-link")[0];
        update_date_a.textContent = this.responseText;
    }

    xhttp_date.open("GET", "/update_date/", true);
    xhttp_date.send();
}

window.onload = function() {
    refresh_update_date();
    window.setInterval(refresh_update_date, 10*60*1000);
}