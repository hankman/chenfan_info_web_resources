function refresh_update_date()
{
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
    window.setInterval(refresh_update_date, 5*60*1000);
}