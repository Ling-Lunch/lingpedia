var express = require('express');
var wechat = require('wechat');
var path = require('path');
//do not upload to github, find it on trello
var wechatConfig = {
  token: 'weixin',
  appid: 'wx198140923ff72506',
  encodingAESKey: 'j4k3kbifNnOOdm7aH8IsLRXWwwyh86OIDabvAhq4imC'
};

var sample = {
    term: '机器翻译',
    desc: '机器翻译（Machine Translation，经常简写为MT，俗称机翻）属于计算语言学的范畴，其研究借由计算机程序将文字或演说从一种自然语言翻译成另一种自然语言。简单来说，机器翻译是通过将一个自然语言的字辞取代成另一个语言的字辞。借由使用语料库的技术，可达成更加复杂的自动翻译，包含可更佳的处理不同的文法结构、词汇辨识、惯用语的对应等。',
    articles: [
        {
            title: '有一天，谷歌也能帮我翻译论文？',
            date: '2015-04-02',
            url: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=203900983&idx=1&sn=cedcf5c5f458193b8170bd688b02093d&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
            pic: 'http://img01.store.sogou.com/net/a/04/link?appid=100520031&url=http://mmbiz.qpic.cn/mmbiz/GIhWrtDH6qdG8qpvmUqico5YwMJKjiaZqlCzZPjPogl7mhiaMYVjDOtydI87IKFicyPRZeLJts6EnI1mF31uicp8ExQ/0'
        },
        {
            title: '语言学经典期刊论文（中文）',
            date: '2014-07-30',
            url: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=200388457&idx=1&sn=c4947e0b49514be5f55a0b36beea01b6&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
            pic: 'http://img01.store.sogou.com/net/a/04/link?appid=100520031&url=http://mmbiz.qpic.cn/mmbiz/GIhWrtDH6qfPlKe0ibojQYJK2Uib12gWG5nAVribBr4FMy7OSUMNpI9RWibsUxicegndDwymugGtf3rLFgV3iapN9J5A/0'
        },
        {
            title: '繁简转换？So Easy ! ',
            date: '2014-11-26',
            url: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=201354491&idx=1&sn=9144e6e1ff471e4c48c53f26aeea2d63&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
            pic: 'http://img01.store.sogou.com/net/a/04/link?appid=100520031&url=http://mmbiz.qpic.cn/mmbiz/GIhWrtDH6qf16nXcg3zfh46J0b7ElCbSwTplzbBZAqxlRUJRcXn4Licy4e30icfiamz3qPDGVqv0iaAKUj7ibePb9uQ/0'
        },
        {
            title: '【语言学家】再见，Fillmore教授 ',
            date: '2014-02-18',
            url: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=200036046&idx=1&sn=a46b6f4ecdc8e20dbcae149526121257&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
            pic: 'http://img01.store.sogou.com/net/a/04/link?appid=100520031&url=http://mmbiz.qpic.cn/mmbiz/GIhWrtDH6qfrGrWCjYMUNibaug8DHBI6XgWLeZ6YQaa3iaBy8fwjpaViajnPYNCxgib9SJbOxSm2Of1e66yTEpqibxw/0'
        },
        {
            title: '如何装作会说外语？ ',
            date: '2014-07-02',
            url: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=200286096&idx=1&sn=c485659e7a039d66eb57c727ca6dc1d5&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
            pic: 'http://img01.store.sogou.com/net/a/04/link?appid=100520031&url=http://mmbiz.qpic.cn/mmbiz/GIhWrtDH6qciaoz8hU1gfBIlD8x3YXCD8Mic5pibYEic0v18L9Y8pwSQX91dLQX6J5TDJtx3oaps5zvquHtXrPYQjQ/0'
        },
        {
            title: '书店可以买到的语料库相关书籍 ',
            date: '2014-08-01',
            url: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=200391552&idx=1&sn=a829e5e0c836616d36415d2664979b78&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
            pic: 'http://img01.store.sogou.com/net/a/04/link?appid=100520031&url=http://mmbiz.qpic.cn/mmbiz/GIhWrtDH6qcwSQyAxcT7GPwibtbHwyZBCFEx09NfSkpwGCbM1oA4kicHsnibUf7CquibVvIe1NRnclgwqEl2vO3gBg/0'
        }
    ]
}

var app = express();
app.use(express.query());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/wechat', wechat(wechatConfig, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  var text = message.Content;
  if (text === '机器翻译'){
      res.reply([
      {
        title: '机器翻译',
        description: 'Lingpedia',
        picurl: 'http://mp.weixin.qq.com/s?__biz=MjM5MTA5MjcxMA==&mid=203900983&idx=1&sn=cedcf5c5f458193b8170bd688b02093d&3rd=MzA3MDU4NTYzMw==&scene=6#rd',
        url: 'http://lingpedia.duapp.com/baike/机器翻译'
      }
    ]);
  }
  // if (message.FromUserName === 'diaosi') {
  //   // 回复屌丝(普通回复)
  //   res.reply('hehe');
  // } else if (message.FromUserName === 'text') {
  //   //你也可以这样回复text类型的信息
  //   res.reply({
  //     content: 'text object',
  //     type: 'text'
  //   });
  // } else if (message.FromUserName === 'hehe') {
  //   // 回复一段音乐
  //   res.reply({
  //     type: "music",
  //     content: {
  //       title: "来段音乐吧",
  //       description: "一无所有",
  //       musicUrl: "http://mp3.com/xx.mp3",
  //       hqMusicUrl: "http://mp3.com/xx.mp3",
  //       thumbMediaId: "thisThumbMediaId"
  //     }
  //   });
  // } else {
  //   // 回复高富帅(图文回复)
  //   res.reply([
  //     {
  //       title: '你来我家接我吧',
  //       description: '这是女神与高富帅之间的对话',
  //       picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
  //       url: 'http://nodeapi.cloudfoundry.com/'
  //     }
  //   ]);
  // }
}));

app.get('/', function(req, res){
    res.send('hello');
});

app.get('/baike/:term', function(req, res){
    res.render(__dirname + '/public/term.ejs', sample);
});


app.listen(18080);
