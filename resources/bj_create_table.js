
function create_table_head() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    ["行政区", "地址", "报告日期", "确诊", "无症状"].forEach(function (item, index) {
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


function create_table_body(data) {
    let tbody = document.createElement("tbody");

    let last_dist = null;
    let last_community = null;

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
        let qz_str = items[3];
        let wzz_str = items[4];
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
        }
        else {
            let th_community = document.createElement("th");
            th_community.textContent = community
            tr.appendChild(th_community);
            last_community = th_community;
        }

        let th_date = document.createElement("th");
        th_date.textContent = (date.getMonth() + 1).toString() + "月" + date.getDate().toString() + "日";
        th_date.style.textAlign = "left";
        th_date.style.whiteSpace = "nowrap";
        tr.appendChild(th_date);

        let set_elem_style = (elem) => {
            elem.style.textAlign = "center";
            elem.style.whiteSpace = "nowrap";
            if (elem.textContent == "0")
            {
                elem.textContent = null
                elem.style.background = "#e0e0e0";
            }
        };

        let th_qz = document.createElement("th");
        th_qz.textContent = qz_str
        set_elem_style(th_qz)
        tr.appendChild(th_qz);

        let th_wzz = document.createElement("th");
        th_wzz.textContent = wzz_str;
        set_elem_style(th_wzz)
        tr.appendChild(th_wzz);

        tbody.appendChild(tr);
    }

    return tbody
}


function create_table(data)
{
    if (data.length == 0) {
        let div = document.createElement("div");
        div.textContent = '(无感染记录或未收录地址。您也可以尝试查询小区名称。注意，输入地址请勿包含行政区。您当前查询的是*北京市*信息。)'
        return div
    }

    let table = document.createElement("table");


    let thead = create_table_head()
    let tbody = create_table_body(data)

    table.appendChild(thead)
    table.appendChild(tbody)
    return table
}
