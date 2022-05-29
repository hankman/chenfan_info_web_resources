
let url_parts= decodeURI(window.location.pathname).split("/")
let query_str = url_parts[url_parts.length - 1]

title = document.getElementById("common-title")
domain_switch = document.getElementById("common-domain-switch")

title.textContent = '"' + query_str + '"的查询结果'

if (url_parts[1] == "bj")
{
    domain_switch.href = "/" + url_parts.slice(2).join("/");
}
else
{
    domain_switch.href = "/bj" + window.location.pathname;
}

const xhttp_long_search_data = new XMLHttpRequest();
xhttp_long_search_data.onload = function() {
    div = document.getElementById("data-div");
    table = create_table(this.responseText);
    div.appendChild(table);
}

xhttp_long_search_data.open("GET", "../../search_data/" + query_str, true);
xhttp_long_search_data.send();
