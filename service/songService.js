var songDB = require("./db/song")

function getNewSong(req, res) {
    songDB.getNewSong(req, res);
}

function getHotSong(req, res) {
    songDB.getHotSong(req, res);
}

function maybeYouLike(req, res) {
    var a= req.query.user_id||null;
    console.log(a);
    songDB.maybeYouLike(a,req, res);
}

function recommendation(req,res){
    songDB.recommendation(req,res);
}
function addRecound(req,res){
    var user_id = req.query.user_id;
    var song_id =req.query.song_id;
    var type = req.query.type2;
    console.log(user_id,song_id,type)
    if (user_id==null||song_id==null||type==null){
        res.send({code:false});
    }
    songDB.addRecound(user_id,song_id,type
        ,req,res);
}

function search(req, res) {
    var {text} = req.query;
    if(text!=''){
        songDB.search(text,req, res);
    }
}

module.exports = {
    getNewSong,
    getHotSong,
    maybeYouLike,
    recommendation,
    addRecound,
    search
}