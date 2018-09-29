var pgconnect = require('../lib/pg');

const cover_imgs = ['fm_01.jpg','fm_02.jpg','fm_03.jpg','fm_04.jpg','fm_05.jpg','fm_06.jpg']

function addCollert(song_id,user_id,req,res) {
    (async () => {
        const client = await pgconnect.connect()
        try {
            console.log(new Date().getTime())

            const dbres2 = await client.query('select * from collect where user_id =$1 and song_id=$2',
                [user_id,song_id])
            if (dbres2.rows.length>0){
                res.send({code:'重复'});

                return;
            }
            const dbres = await client.query('insert into collect (user_id, song_id, create_time) values ($1,$2,$3)',
                [user_id,song_id,new Date().getTime()])
            return res.send({code:true});
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}
function getUserCollert(user_id,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select s.* from song s ,(select song_id from collect where user_id=$1 order by  create_time desc ) p where s.song_id = p.song_id;',
                [user_id])
            return res.send(dbres.rows);
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}

function addTag(tag_name,user_id,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            console.log(new Date().getTime())
            const dbres = await client.query('insert into tag (tag_name, user_id, create_time)  values ($1,$2,$3)',
                [tag_name,user_id,new Date().getTime()])
            return res.send({code:true});
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}
function addUserTageInfo(tag_name,user_id,song_id,req,res){

    (async () => {
        const client = await pgconnect.connect()
        try {
            console.log(new Date().getTime());
            var has = await  client.query('select * from tag_song where song_id = $1 and user_id = $2 and tag_name = $3;',
                [song_id,user_id,tag_name]);
            if(has.rows.length>0){
                return res.send({code : '1'})
            }else {
                const dbres = await client.query('insert into tag_song ( tag_name, song_id,user_id)  values ($1,$2,$3)',
                    [tag_name,song_id,user_id])
                return res.send({code: '0'});
            }
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}



function getUserTag(user_id,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select * from tag where user_id =$1',
                [user_id])
            return res.send(dbres.rows);
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}

function getUserTagInfo(user_id,tag_name,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select * from (select s.* from song s ,(select * from tag_song where user_id=$1 and tag_name=$2) g where s.song_id = g.song_id) as p\n' +
                'left join (select song_id as like from collect where user_id=$3) s on p.song_id=s.like;',
                [user_id,tag_name,user_id])
            return res.send(dbres.rows);
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}

function addSongList(song_list_name,user_id,req,res){
    (async () => {
        const client = await pgconnect.connect();
        const cover_img =   cover_imgs[ Math.floor(Math.random()*6 ) ]
        try {
            // console.log(new Date().getTime())
            const dbres = await client.query('insert into song_sheet (song_sheet_name, user_id, cover_img_addr) values ($1,$2,$3)',
                [song_list_name,user_id, cover_img])
            return res.send({code:true});
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}
function getUserSongList(user_id,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select * from song_sheet where user_id =$1',
                [user_id])
            return res.send(dbres.rows);
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}

function addUserSongListInfo(song_list_name,song_id,user_id,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            // 先查询是否已经存在这首歌了
            var has = await  client.query('select * from song_sheet_song where song_id = $1 and user_id = $2 and song_sheet_name = $3;',
                [song_id,user_id,song_list_name]);
            console.log(has.rows,146);
            if(has.rows.length>0){
               return res.send({code : '1'})

            }else {
                const dbres = await client.query('insert into song_sheet_song (song_sheet_name, song_id, user_id)  values ($1,$2,$3)',
                    [song_list_name,song_id,user_id])
                return res.send({code: '0'});
            }
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}
function getUserSongListInfo(song_list_name,user_id,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select * from (select s.* from song s , (select song_id from song_sheet_song where user_id = $1 and song_sheet_name= $2 ) g where s.song_id=g.song_id) q left join (select song_id as like from collect where user_id=$3) l on q.song_id=l.like;',
                [user_id,song_list_name,user_id])
            return res.send(dbres.rows);
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:false})
    })
}

function login(user_id,password,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            const dbres = await client.query('select * from my_user where user_id = $1',
                [user_id])

            if(dbres.rows[0]){
                console.log(dbres.rows[0],177)
                if (dbres.rows[0].password === password){
                    var code =new Date().getTime()+"/"+user_id
                    res.cookie("login",code);
                    res.cookie('user_id',   user_id);
                    // console.log(dbres.rows[0])
                    await client.query('insert into user_login values ($1,$2,$3)',
                        [user_id,code,new Date().getTime()]);

                    res.send({code:true})
                }else{
                    res.send({code:'密码错误'})
                }
            }else {
                res.send({code: 0})
            }

        } finally {
            client.release()
        }
    })().catch(e =>{
        console.log(e)
        res.send(e)
    })
}

function isLogin(user_id,code,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            var time = new Date().getTime()-86400000*7
            const dbres = await client.query('select * from user_login where user_id = $1 and add_time>$2',[user_id,time]);
            if (dbres.rows.length<=0&&dbres.rows[0].code!=code){
                res.send({code:false})
            }else {
                res.send({code:true})
            }

        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send(e)
    })
}

function register(user_id,password,email,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
          var has = await  client.query('select * from my_user where user_id = $1;',[user_id]);
          if(has.rows.length===1){
              res.send({code:"账号重复请重试"})
          }else {
              await client.query('insert into my_user (user_id, password, email) values($1,$2,$3) ',[user_id,password,email]);
              var code =new Date().getTime()+"/"+user_id
              res.cookie("login",code);
              await client.query('insert into user_login values ($1,$2,$3)',
                  [user_id,code,new Date().getTime()])
              res.send({code:true})
          }
        } finally {
            client.release()
        }
    })().catch(e =>{
        console.log(e);
        res.send({code:"账号重复请重试"})
    })
}

function updateUser(user_id,password,email,req,res){
    (async () => {
        const client = await pgconnect.connect()
        try {
            await client.query('update my_user set password=$1,email=$2 where user_id=$3',
                [password,email,user_id])
            res.send({code:true})
        } finally {
            client.release()
        }
    })().catch(e =>{
        res.send({code:"账号重复请重试"})
    })
}

function cancelCollect(song_id, req, res) {
    /**
     * why error
     */
    //console.log(user_id,song_id,'!!!!')
    (async () => {
        const client = await  pgconnect.connect()
        var user_id = req.cookies.user_id;
        try {
            await client.query('delete  from collect where user_id = $1  and song_id=  $2 ;',
                [ user_id, song_id ])
            res.send({code: true})
        } finally {
            client.release()
        }
    })().catch(err => {
        res.send({code : 'err'})
    })
}

function deleteTag(user_id,tag_name,req,res) {
    (async () => {

        const client = await  pgconnect.connect();
        try {
            var r =  await  client.query('delete  from tag where user_id = $1  and tag_name= $2 ;',
                [user_id,tag_name]);
            await client.query('delete  from tag_song where user_id = $1  and tag_name = $2 ;',
                [user_id,tag_name]);

            res.send({code: true})
        } finally {
            client.release()
        }
    })().catch(err => {
        res.send({code: 'err'})
    })
}
function deleteSongSheet(user_id, song_sheet_name, req, res){

    (async () => {
        const client = await  pgconnect.connect();
        try {
            await  client.query('delete  from song_sheet where user_id = $1  and song_sheet_name= $2 ;',
                [user_id,song_sheet_name]);
            await client.query('delete  from song_sheet_song where user_id = $1  and song_sheet_name = $2 ;',
                [user_id,song_sheet_name]);
            res.send({code: true})

        } finally {
            client.release()
        }
    })().catch(err => {
        res.send({code:'err'})
    })
}
function addSong(req,res) {
    ( async () => {
        const client = await  pgconnect.connect();
        try {
            const {song_id } =  req.body;
            var dbres = await client.query('select * from song where song_id = $1;',[song_id]);
            if(dbres.rows.length === 0){
                const { title, address, author, cover_img, type } = req.body;
                var create_time = Date.now();
                var dd =  await  client.query('insert  into song (title, address, author, create_time, type, cover_img, song_id) values ($1,$2,$3,$4,$5,$6,$7)',
                    [title,address ,author, create_time, type, cover_img, song_id]);

                console.log(dd,330330);
                res.send({message: 'ok'})

            }else {
                res.send({message: 'song_id 已存在'})
            }
        } finally {
            res.send({message: '服务器出错'})
        }


    })()
}

function deleteSFromTag(req, res){
    ( async () => {
        const client = await  pgconnect.connect();
        try {
            const {song_id,tag_name} = req.query;
            const user_id = req.cookies.user_id;
            var dbres = await  client.query('delete from tag_song where user_id = $1 and song_id = $2 and tag_name = $3;',[user_id,song_id,tag_name]);

            if(dbres.rowCount > 0){
                res.send({code:  true})
            }
        } finally {
            res.send({message:'服务器出错'})
        }
    })()
}

function deleteSFromSongsheet(req, res) {
    ( async () => {
        const client = await  pgconnect.connect();
        try {
            const {song_id,song_sheet_name} = req.query;
            const user_id = req.cookies.user_id;
            var dbres = await  client.query('delete from song_sheet_song where user_id = $1 and song_id = $2 and song_sheet_name = $3;',[user_id,song_id,song_sheet_name]);

            if(dbres.rowCount > 0){
                res.send({code:  true})
            }
        } finally {
            res.send({message:'服务器出错'})
        }
    })()
}

module.exports={
    addCollert,
    getUserCollert,
    addTag,
    getUserTag,
    getUserTagInfo,
    addSongList,
    getUserSongList,
    getUserSongListInfo,
    addUserTageInfo,
    addUserSongListInfo,
    login,
    isLogin,
    register,
    updateUser,
    cancelCollect,
    deleteTag,
    deleteSongSheet,
    addSong,
    deleteSFromTag,
    deleteSFromSongsheet
}