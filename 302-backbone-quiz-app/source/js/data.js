module.exports = [{
      id: 'start',
      title: '有一种游戏叫做顽皮狗制作',
      imageURL: './source/img/Naughty dog (2).jpg',
      question: '测测你对顽皮狗(Naughty Dog)的熟悉程度',
      btnClass: 'btn btn-alone',
      answers: ['开始测试'],
      hrefs: ['#cards/0']
    },{
      id: 'end',
      imageURL: './source/img/end.jpg',
      question: '',
      answers: ['再来一次', '分享'],
      hrefs: ['#start', '#start']
    },{
      id: 'fake-end',
      imageURL: './source/img/fake.jpg',
      question: '',
      answers: ['再来一次', '分享'],
      hrefs: ['#start', '#start']
      },{
      id: 0,
      imageURL: './source/img/crash.jpg',
      question: '作为顽皮狗早期作品，《古惑狼》(Crash Bandicoot)系列主要围绕一只名叫Crash Bandicoot的突变袋狸和他的创造者Neo Cortex博士之间的斗争展开。请问作为Crash亦师亦友的木制面具里的灵魂的名字是？',
      answers: ['Aku Aku', 'Uka Uka'],
      hrefs: ['#cards/1', '#cards/1'],
      points: [1, 0]
    },{
      id: 1,
      imageURL: './source/img/TLOU (2).jpg',
      question: '作为顽皮狗秘密开发的作品，《最后的生还者》(The Last of US)讲述了在人类因病毒面临绝种危机的环境下，幸存的人类为了生存而自相残杀。'+
                  '而因为瘟疫痛失女儿而摒弃了人性的主角乔(Joel)因为一次偶然机会肩负起了保护主角艾莉(Ellie)踏上了寻找‘火萤’(Fireflies)组织的一场危险而深刻旅程。' + 
                    '那么请问艾莉为什么免疫病毒？',
      answers: ['艾莉是免疫体，有抗体','艾莉感染的病毒突变，变的无害了'],
      hrefs: ['#cards/2', '#cards/2'],
      points: [0, 1]
    },{
      id: 2,
      imageURL: './source/img/uncharted.jpg',
      question: '作为顽皮狗当前最为瞩目的作品，《神秘海域》(Uncharted)系列主要围绕主角内森·德雷克(Nathan Drake)、其亦父亦友的维克托·苏利文(Victor Sullivan)和暧昧不清的艾莲娜·费舍尔(Elena Fisher)在世界各地的寻宝冒险。'+
                  '请问主角内森·德雷克与弗朗西斯·德雷克(Francis Drake)之间的关系是？',
      answers: ['内森·德雷克是其后代','毫无关系'],
      hrefs: ['#end', '#end'],
      points: [0, 1]
    }];


