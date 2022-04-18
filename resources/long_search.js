
let url_parts= decodeURI(window.location.href).split("/")
let query_str = url_parts[url_parts.length - 1]

title = document.getElementById("common-title")
title.textContent = '"' + query_str + '"的查询结果'

function processing_data(data) {
    div = document.getElementById("data-div");
    table = create_table(data);
    div.appendChild(table);
}

const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    processing_data(this.responseText);
}
xhttp.open("GET", "/search_data/" + query_str, true);
xhttp.send();
