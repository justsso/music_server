
function resToJSONObject(res){
    //console.log(res)
    var row = res.rows;
    var field = res.fields;
    var arr = [];
    for (var a=0;a<row.length;a++){
        var object = {};
        for (var b=0;b<field.length;b++){
            object[field[b].name]=row[a][field[b].name];
        }
        arr[a]=object;
    }
    console.log("***"+arr);
}

module.exports = resToJSONObject;