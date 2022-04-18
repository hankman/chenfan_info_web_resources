
var allow_query = true

const button = document.getElementById("search");
const long_search_button = document.getElementById("long-search");
const addr_input = document.getElementById("address")

const disable_query = () => {
    allow_query = false
    button.disabled = true;
    button.style.backgroundColor = "#cfcfcf"
};

const enable_query = () => {
    allow_query = true
    button.disabled = false;
    button.style.backgroundColor = "white"
};

var flash_cnt = 0;
var curr_timer = null;

const change_input_bg = () => {
    if (flash_cnt === 0) {
        curr_timer = null;
        return
    }
    if (flash_cnt % 2 === 0) {
        addr_input.style.backgroundColor = "red"
    }
    else {
        addr_input.style.backgroundColor = "white"
    }
    flash_cnt -= 1;
    curr_timer = setTimeout(change_input_bg, 100)
}

const flash_input = () => {
    if (curr_timer != null) {
        return
    }
    flash_cnt = 6;
    change_input_bg();
}

function processing_data(data)
{
    div = document.getElementById("data-div")
    var child = div.lastElementChild;
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }

    table = create_table(data);
    div.appendChild(table);

    div.scrollTop = 0;
    enable_query()
}


function do_ajax_query(addr)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        processing_data(this.responseText);
    }
    xhttp.open("GET", './search_data/' + addr, true);
    xhttp.send();
}

function search_address()
{
    if (!allow_query) return;
    if (addr_input.value == null || addr_input.value == "") {
        flash_input();
        return;
    }
    do_ajax_query(addr_input.value)
    disable_query()
}

document.getElementById("address").addEventListener(
    "keyup", function(event) {
        if (event.key  == "Enter" && allow_query) {
            search_address();
        }
    })

button.addEventListener("click", search_address)

long_search_button.addEventListener("click", function() {
        var addr = addr_input.value
        if (addr_input.value == null || addr_input.value == "") {
            flash_input();
            return;
        }
        window.location.pathname = window.location.pathname + "search/" + addr
    })
