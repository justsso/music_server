const Sequelize = require('sequelize');
const config = require('./config');
const Op = Sequelize.Op;

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, Object.assign({}, config.db.config, { operatorsAliases: Op }));

const SongSheet = sequelize.define('SongSheet', {
  id: {
    type: DataTypes.INTEGER,
    comment: '歌单ID'
  },
  uuid: {
    type: Sequelize.UUID,
    comment: "歌单id"
  },
  name: {
    type: Sequelize.STRING(255),
    comment: '歌单的名字'
  },
  songArr: {
    type: Sequelize.JSON,
    comment: "歌曲的id"
  },
  owner: {
    type: Sequelize.STRING(255),
    comment: '所属者  admin || xiaoya'
  },
  coverImg: {
    type: Sequelize.STRING(255),
    comment: '歌单封面图片'
  }
}, {
  freezeTableName: true,
  tableName: "songSheet"
})

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    comment: '用户ID'
  },
  uuid: {
    type: Sequelize.UUID,
    comment: '用户的id'    
  },
  email: {
    type: Sequelize.STRING(255),
    comment: '邮箱'
  },
  name: {
    type: Sequelize.STRING(255),
    comment: '昵称'
  },
  password: {
    type: Sequelize.STRING(255),
    comment: '密码'    
  },
  collect: {
    type: Sequelize.JSON,
    comment: '收藏的歌曲'
  },
  tagList: {
    type: Sequelize.JSON,
    comment: '标签id 组成的数组'
  }
},{
  freezeTableName: true,
  tableName: "User"
})

const TagList = sequelize.define('TagList', {
  id: {
    type: DataTypes.INTEGER,
    comment: '标签ID'
  },
  uuid: {
    type: Sequelize.UUID,
    comment: '一个标签的uuid'    
  },
  name: {
    type: Sequelize.STRING(255),
    comment: '标签的名字' 
  },
  userUuid: {
    type: Sequelize.STRING(255),
    comment: '关联的用户' 
  },
  songList: {
    type: Sequelize.JSON,
    comment: '这个标签对应的歌曲'
  }
},
{
  freezeTableName: true,
  tableName: 'TagList'
});

const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    comment: '歌的ID'
  },
  uuid: {
    type: Sequelize.UUID,
    comment: '一个标签的uuid'    
  },
  title: {
    type: sequelize.STRING(255)
  },
  address: {
    type: sequelize.STRING(255)
  },
  author: {
    type: sequelize.STRING(255)
  },
  time: {
    type: sequelize.STRING(255)
  },
  type: {
    type: sequelize.STRING(255)
  },
  coverImg:{
    type: sequelize.STRING(255)
  }
},{
  freezeTableName:true,
  tableName: 'Song'
});

const Record = sequelize.define('Record',{
  id: {
    type: DataTypes.INTEGER
  },
  uuid: {
    type: Sequelize.UUID,
  },
  userId: {
    type: sequelize.STRING(255)
  },
  SongId: {
    type: sequelize.STRING(255)
  },
  ListenTime: {
    type: Sequelize.DATE
  },
  type: {
    type: sequelize.STRING(255)
  }
},{
  freezeTableName: true,
  tableName: 'Record'
})


const LunBo = sequelize.define('LunBo', {
  
})






sequelize.sync();

// 检测连接是否成功
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
