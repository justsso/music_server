var pgconnect = require('../lib/pg');
const _ = require('lodash');

function getNewSong(req, res) {
    (async () => {
        const client = await pgconnect.connect()
        var user_id =  req.cookies.user_id || '';
        try {

            // const dbres = await client.query('select * from song left join (select song_id as like from collect where user_id=$1) s on song.song_id= s.like limit 6',
            //     [user_id])
            const dbres = await  client.query('select  * from song order by create_time desc  limit  6;');
            if(user_id){
                const collects = await client.query('select song_id from collect where user_id = $1;',[user_id]);
                console.log(collects.rows);
                for (let i = 0; i < dbres.rows.length; i++) {
                    let a = _.findIndex(collects.rows, function(o) { return o.song_id == dbres.rows[i].song_id; });
                    if(a !== -1){
                        dbres.rows[i].like = 'true'
                    }
                }
            }else {

            }

            return res.send(dbres.rows);

        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))
}

function getHotSong(req, res) {
    (async () => {
        const client = await pgconnect.connect()
        var user_id =  req.cookies.user_id || null;
        console.log(user_id,4040)
        try {
            // if(user_id){
                let dbres = await client.query('select * from (select s.* from song as s , (select count(song_id) c,song_id from record group by song_id order by song_id desc limit 6) as f where s.song_id=f.song_id) k left join (select song_id as like from collect where user_id=$1) as p on k.song_id=p.like limit 6;',[user_id])
                return res.send(dbres.rows);
            // }else {
                console.log('走了else ')
                // let dbres = await  client.query('select  * from record  limit 6;')
                // console.log(dbres,4949)
                // return res.send(dbres.rows);
            // }
        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))
}

function maybeYouLike(user_id, req, res) {
    (async () => {
        const client = await pgconnect.connect()
        try {
            if (user_id == null) {
                user_id = "";
            }
            console.log("+++"+user_id);
            const dbres =
                await client.query('select s.* from song s,(select * from record where user_id=$1 order by listen_time desc) p where p.song_id = s.song_id', [user_id])
            var arr = dbres.rows;
            console.log(arr);
            var infoArr = [];
            for (var a = 0; a < arr.length; a++) {
                var item = await client.query('select * from song where type =$1 order by random() limit 1', [arr[a].type]);
                infoArr[a] = item.rows[0];
            }
            console.log(infoArr);
            if (infoArr.length < 6) {
                var item = await client.query('select * from song limit 6');
                var lll = infoArr.length;
                for (var a = infoArr.length; a < 6; a++) {
                    infoArr.push(item.rows[a - lll]);
                }
            }
            console.log("jkljlkjlkjj")
            console.log(infoArr);
            res.send(infoArr);
        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))
}

function recommendation(req, res) {
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select * from song order by create_time asc limit 8 ;')
            return res.send(dbres.rows);
        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))
}

function addRecound(user_id,song_id,type,req,res){

    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('insert into record (user_id,song_id,listen_time,type) values ($1,$2,$3,$4)',[user_id,song_id,new Date().getTime(),type])
            return res.send({code : true});
        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))
}

function search(text, req, res){

    ( async () => {
        const client = await pgconnect.connect()
        try {
            console.log(text,123123)
            const dbres = await client.query('select * from song where title  ~* $1;',[text]);
            console.log(dbres.rows);

            return res.send({
                songs: dbres.rows
            })

        } finally {
            client.release();
        }
    })().catch(err => {
        console.log(err)
        if(err){
            res.send({code: '服务器出错'})
        }
    })
}
module.exports = {
    getNewSong,
    getHotSong,
    maybeYouLike,
    recommendation,
    addRecound,
    search
};

