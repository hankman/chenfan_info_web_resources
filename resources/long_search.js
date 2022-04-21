
let url_parts= decodeURI(window.location.href).split("/")
let query_str = url_parts[url_parts.length - 1]

title = document.getElementById("common-title")
title.textContent = '"' + query_str + '"的查询结果'

const xhttp_long_search_data = new XMLHttpRequest();
xhttp_long_search_data.onload = function() {
    div = document.getElementById("data-div");
    table = create_table(this.responseText);
    div.appendChild(table);
}

xhttp_long_search_data.open("GET", "/search_data/" + query_str, true);
xhttp_long_search_data.send();
