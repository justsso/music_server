var userbd = require("./db/userBD")

function addCollection(req, res) {
    console.log(req);
    var songid = req.query.song_id || null;
    var user_id = req.cookies.user_id || null;
    console.log(songid + " " + user_id)
    if (songid == null || user_id == null) {
        res.send({code: false});
    } else {
        userbd.addCollert(songid, user_id, req, res);
    }
}

function getUserCollert(req, res) {
    var user_id = req.cookies.user_id || null;
    console.log(user_id)
    if (user_id == null) {
        res.send({code: false})
    }
    userbd.getUserCollert(user_id, req, res);
}

function addTag(req, res) {
    console.log(req)
    var tag_name = req.query.tag_name || null;
    var user_id = req.cookies.user_id || null;
    console.log(tag_name + " " + user_id)
    if (tag_name == null || user_id == null) {
        res.send({code: false});
    } else {
        userbd.addTag(tag_name, user_id, req, res);
    }
}

function getUserTag(req, res) {
    var user_id = req.cookies.user_id || null;
    console.log(user_id)
    if (user_id == null) {
        res.send({code: false})
    }
    userbd.getUserTag(user_id, req, res);
}
//向一个标签中添加歌曲
function addUserTageInfo(req, res) {
    var user_id = req.query.user_id || null;
    var tag_name = req.query.tag_name || null;
    var song_id = req.query.song_id || null;
    console.log(user_id, tag_name, song_id);
    if (user_id == null || tag_name == null || song_id == null) {
        res.send({code: false})
    } else {
        userbd.addUserTageInfo(tag_name, user_id, song_id, req, res);
    }
}
//获取一个用户某一个标签的内容
function getUserTagInfo(req, res) {
    var user_id = req.query.user_id || null;
    var tag_name = req.query.tag_name || null;
    console.log(user_id + " " + tag_name)
    if (user_id == null || tag_name == null) {
        res.send({code: false})
    } else {
        userbd.getUserTagInfo(user_id, tag_name, req, res);
    }
}

function addSongList(req, res) {
    var song_sheet_name = req.query.song_sheet_name || null;
    var user_id = req.cookies.user_id || null;
    if (song_sheet_name == null || user_id == null) {
        res.send({code: false});
    } else {
        userbd.addSongList(song_sheet_name, user_id, req, res);
    }
}

function getUserSongList(req, res) {
    var user_id = req.cookies.user_id || null;
    console.log(user_id)
    if (user_id == null) {
        res.send({code: false})
    }
    userbd.getUserSongList(user_id, req, res);
}

function addUserSongListInfo(req, res) {
    var user_id = req.cookies.user_id || null;
    var song_list_name = req.query.song_sheet_name || null;
    var song_id = req.query.song_id || null;
    console.log(user_id + " " + song_list_name + " " + song_id)
    if (user_id == null || song_list_name == null || song_id == null) {
        res.send({code: false})
    } else {
        userbd.addUserSongListInfo(song_list_name, song_id, user_id, req, res);
    }
}

function getUserSongListInfo(req, res) {
    var user_id = req.query.user_id || null;
    var song_sheet_name = req.query.song_sheet_name || null;

    console.log(user_id + " " + song_sheet_name)
    if (user_id == null || song_sheet_name == null) {
        res.send({code: false})
    } else {
        userbd.getUserSongListInfo(song_sheet_name, user_id, req, res);
    }
}

function login(req, res) {
    var user_id = req.query.user_id || null;
    var password = req.query.password || null;
    console.log(user_id + " " + password)
    if (user_id == null || password == null) {
        res.send({code: false})
    } else {
        userbd.login(user_id, password, req, res);
    }
}

function register(req, res) {
    var user_id = req.query.user_id || null;
    var password = req.query.password || null;
    var email = req.query.email || null;
    console.log(user_id + " " + password + " " + email)
    if (user_id == null || password == null || email == null) {
        res.send({code: false})
    } else {
        userbd.register(user_id, password, email, req, res);
    }
}

function isLogin(req, res) {
    var user_id = req.query.user_id || null;
    var code = req.cookies.login || null;
    console.log(req.cookies)
    if (user_id == null || code == null) {
        res.send({code: false})
    }
    userbd.isLogin(user_id, code, req, res);
}

function updateUser(req, res) {
    var user_id = req.query.user_id || null;
    var password = req.query.password || null;
    var email = req.query.email || null;
    console.log(user_id + " " + password + " " + email)
    if (user_id == null || password == null || email == null) {
        res.send({code: false})
    } else {
        userbd.updateUser(user_id, password, email, req, res);
    }
}


function cancelCollect(req, res) {
    var { song_id} = req.query;
    userbd.cancelCollect( song_id, req, res);

}

function deleteTag(req, res) {
    var {user_id, tag_name} = req.query;
    console.log(user_id, tag_name)
    userbd.deleteTag(user_id, tag_name, req, res);
}

function deleteSongSheet(req, res) {
    var {user_id, song_sheet_name} = req.query;
    console.log(user_id, song_sheet_name)
    userbd.deleteSongSheet(user_id, song_sheet_name, req, res);
}

function addSong(req, res) {

    userbd.addSong(req,res);
}


function deleteSFromTag(req, res) {
    userbd.deleteSFromTag(req, res);
}
function deleteSFromSongsheet(req, res) {
    userbd.deleteSFromSongsheet(req, res);
}

module.exports = {
    addCollection,
    getUserCollert,
    addTag,
    getUserTag,
    addSongList,
    getUserSongList,
    getUserTagInfo,
    getUserSongListInfo,
    addUserTageInfo,
    addUserSongListInfo,
    login,
    register,
    isLogin,
    updateUser,
    cancelCollect,
    deleteTag,
    deleteSongSheet,
    addSong,
    deleteSFromTag,
    deleteSFromSongsheet
}