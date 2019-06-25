$(document).ready(()=>{
    initialize();
});

function initialize() {
    // get all tables
    request({opt: "table"}, (data)=>{
        tables = JSON.parse(data);
        tables.forEach((ele)=>{
            $("#table-select").append(`<div id=${ele}>${ele}</div>`);
        });
    });
    $(document).on("click", "#table-select div", (e)=>{
        let table = e.target.innerHTML;
        query(`select * from ${table}`);
    });

    // add button click event listener
    $("#query-commit").click(()=>{
        query($("#query-str").val());
    });
    $("#insert").click(()=>{
        // $("#query-str").val("insert into 基础.教师\nvalues('0111', 'test', '女', 3, 'subjtest', '助教', null)");
        $("#query-str").val("insert into customer\nvalues('网页', 11, 'web@qq.com', '1111111111', '网页测试', '网页测试格言', default)");
    });
    $("#update").click(()=>{
        // $("#query-str").val("update 基础.教师\nset 工资=8000 where 教师编号='0111'");
        $("#query-str").val("update customer\nset credit=50 where user_name='网页'");
    });
    $("#delete").click(()=>{
        // $("#query-str").val("delete 基础.教师\nwhere 教师编号='0111'");
        $("#query-str").val("delete customer\nwhere user_name='网页'");
    });
}

function query(queryStr) {
    $("#result thead").html("");  // 清空原有信息
    $("#result tbody").html("");  // 清空
    $("#commit-info").remove();

    request({opt: "query", queryStr: queryStr}, (data)=>{
        if (data === "") {
            $("#result").append("<font id='commit-info' color='red'>已提交</font>");
        } else {
            data = JSON.parse(data);
            // table head
            let keys = Object.keys(data[0]);
            keys.forEach((ele)=>{
                $("#result thead").append(`<th>${ele}</th>`);
            });

            // table body
            for (let item of data) {
                let row = "<tr>";
                let values = Object.values(item);
                values.forEach((ele)=>{
                    row += `<td>${ele}</td>`
                });
                row += "</tr>";
                $("#result tbody").append(row);
            }
        }
    });
}

function request(data, callback) {
    $.ajax({
        url: "http://127.0.0.1:3000/",
        type: "POST",
        contentType: "text/plain",  // 发送数据格式
        dataType: "text",     // 接收数据格式
        data: JSON.stringify(data)
    }).done(callback);
}
