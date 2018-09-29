var express = require('express');
var router = express.Router();
var path = require('path');
var media = path.join(__dirname, '../public/media')
var songService = require("../service/songService")
var userService = require("../service/userService")

/* GET home page. */

router.get('/', function(req, res, next) {
  var fs = require('fs');
  fs.readdir(media, function(err, names){
    if(err){
      console.log(err)
    }else {
      res.render('index', { title: 'Passionate Music', music: names });
    }
  })

});

router.get('/add_record',(req,res)=>{
    songService.addRecound(req,res);
})

/**
 * 新歌榜
 */
router.get('/get_new_song',(req,res)=>{
    var ss = songService.getNewSong(req,res);
})
/**
 * 热歌榜
 */
router.get('/get_hot_song',(req,res)=>{
    var ss = songService.getHotSong(req,res);
})

/**
 * 猜你喜欢
 */
router.get('/maybe_you_like',(req,res)=>{
    songService.maybeYouLike(req,res);
})

/**
 * 8张图片推荐
 */
router.get('/recommendation',(req,res)=>{
  songService.recommendation(req,res);
})

/**添加用户收藏
 *
 */
router.get('/add_collect',(req,res)=>{
  userService.addCollection(req,res)
})

/**
 * 用户收藏的信息
 */
router.get('/get_user_collect',(req,res)=>{
  userService.getUserCollert(req,res);
})
//用户添加标签
router.get('/add_tag',(req,res)=>{
    userService.addTag(req,res);
})
//获取用户所有的标签
router.get('/get_user_tag',(req,res)=>{
    userService.getUserTag(req,res);
})
//一个用户向一个标签里面添加歌曲
router.get('/add_user_tag_info',(req,res)=>{
  userService.addUserTageInfo(req,res);
})
//获取用户某一个标签的内容
router.get('/get_user_tag_info',(req,res)=>{
    userService.getUserTagInfo(req,res);
})
// 添加歌单
router.get('/add_song_list',(req,res)=>{
    userService.addSongList(req,res);
})
// 获取一个用户的所有歌单
router.get('/get_user_song_list',(req,res)=>{
    userService.getUserSongList(req,res);
})
//一个用户向一个歌单里面添加歌曲
router.get('/add_user_song_list_info',(req,res)=>{
    userService.addUserSongListInfo(req,res);
})
//获取一个歌单的内容
router.get('/get_song_list_info',(req, res) => {
    userService.getUserSongListInfo(req,res);
})

router.get('/login',(req,res)=>{
    userService.login(req,res);
})

router.get('/register',(req,res)=>{
    userService.register(req,res);
})

router.get('/is_login',(req,res)=>{
    userService.isLogin(req,res);
})


router.get('/update_user',(req,res)=>{
    userService.updateUser(req,res);
})


router.get('/cancel_collect', (req, res) =>{
    userService.cancelCollect(req,res);
})


router.get('/delete_tag', (req, res) => {
    userService.deleteTag(req,res);
})

router.get('/delete_song_sheet',(req, res) => {
    userService.deleteSongSheet(req, res);
})

router.post('/add_song',(req,res) => {
    userService.addSong(req,res);
})

router.get('/search',(req, res) => {
    songService.search(req,res);
})

router.get('/delete_s_from_tag',(req, res) => {
    userService.deleteSFromTag(req, res);
})


router.get('/delete_s_from_songsheet',(req, res) => {
    userService.deleteSFromSongsheet(req, res);
})

module.exports = router;
