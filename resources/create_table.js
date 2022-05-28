
function create_table_head() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    ["区", "地址", "解封剩余", "报告日期"].forEach(function (item, index) {
            let th = document.createElement("th");

            if (item == "解封剩余") {
                let tdiv = document.createElement("div")
                tdiv.textContent = item;
                tdiv.style.color = "red"
                th.appendChild(tdiv)
            }
            else {
                th.textContent = item;
            }
            tr.appendChild(th);
        })
    return thead;
}

function add_color_sec(color, curr_bg, curr_p) {
    curr_bg += "white " + curr_p + "%, ";
    curr_bg += color + " " + curr_p + "%, ";
    curr_p += 6;
    curr_bg += color + " " + curr_p + "%, ";
    curr_bg += "white " + curr_p + "%, ";
    curr_p += 1;
    return [curr_bg, curr_p];
}

function color_sec_community(th, d, color) {
    let curr_p = (14 - d) * 7;
    let curr_bg = "linear-gradient(90deg, ";
    for(let rnd = 0; rnd < d; ++rnd) {
        [curr_bg, curr_p] = add_color_sec(color, curr_bg, curr_p);
    }
    curr_bg += "white " + curr_p + "%)"
    th.style.background = curr_bg
}

function insert_community_status(th, name, color) {
    let div_node = document.createElement("div")
    div_node.textContent = "当前："
    div_node.className = "curr_status"
    let span_node = document.createElement("span")
    span_node.textContent = name
    span_node.style.color = color
    div_node.appendChild(span_node)
    th.appendChild(div_node)
}


function create_table_body(data) {
    let tbody = document.createElement("tbody");

    let last_dist = null;
    let last_community = null;
    let last_remain = null;
    let today = new Date()

    const rows = data.split("\n");

    let rowLength = rows.length;
    for (let i = 0; i < rowLength; ++i) {
        row_data = rows[i].trim()
        if (row_data == '') {
            continue;
        }
        let items = row_data.split(",");
        let dist = items[0];
        let community = items[1];
        let date_str = items[2];
        date = new Date(date_str)

        let tr = document.createElement("tr")
        if (last_dist && dist == last_dist.textContent) {
            last_dist.rowSpan += 1;
        }
        else {
            let th = document.createElement("th")
            th.textContent = dist
            th.rowSpan = "1"
            tr.appendChild(th)
            last_dist = th
            last_community = document.createElement("th")
        }

        if (community && community == last_community.textContent) {
            last_community.rowSpan += 1;
            last_remain.rowSpan += 1;
        }
        else {
            let th_community = document.createElement("th");
            let th_remain = document.createElement("th");

            remain_days = Math.max(
                14 - Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24)),
                0);
            th_community.textContent = community;
            th_community.rowSpan = "1";
            th_remain.textContent = remain_days.toString() + " 天";
            th_remain.rowSpan = "1";

            let dist_kind_name = ""
            let fg_color = "black"
            if (remain_days == 0)
            {
                fg_color = "#4adc4a";
                dist_kind_name = "防范区";
                th_community.style.background = "#c0ffc0";
            }
            else {
                let bg_color = "white"
                if (remain_days <= 7)
                {
                    fg_color = "#eeab65";
                    bg_color = "#ffdfbd";
                    dist_kind_name = "管控区"
                }
                else
                {
                    fg_color = "#ff8d8d";
                    bg_color = "#ffdddd";
                    dist_kind_name = "封控区"
                }
                color_sec_community(th_community, remain_days, bg_color)
            }
            insert_community_status(th_remain, dist_kind_name, fg_color)


            tr.appendChild(th_community);
            tr.appendChild(th_remain);
            last_community = th_community;
            last_remain = th_remain;
        }

        let th_date = document.createElement("th");
        th_date.textContent = (date.getMonth() + 1).toString() + "月" + date.getDate().toString() + "日";
        tr.append(th_date);

        tbody.append(tr);
    }

    return tbody
}


function create_table(data)
{
    if (data.length == 0) {
        let div = document.createElement("div");
        div.textContent = '(无感染记录或未收录地址。注意，输入地址请勿包含行政区或者楼栋。)'
        return div
    }

    let table = document.createElement("table");
    table.classList.add("extra-header-table")

    let thead = create_table_head()
    let tbody = create_table_body(data)

    table.appendChild(thead)
    table.appendChild(tbody)
    return table
}
