import Mock from 'mockjs';

// const Random = Mock.Random;

const mockdata = {
  advertiser: {
    data: [
      {
        name: '北京揆理度势111',
        appid: 'dasf3432533',
        oldid: '上海市普陀区金沙江路 1518 弄',
        time: '2018-02-23 10:32:34',
        state: 'true',
      },
      {
        name: '北京揆理度势',
        appid: 'dasf3432533',
        oldid: '上海市普陀区金沙江路 1518 弄',
        time: '2018-02-23 10:32:34',
        state: 'true',
      },
      {
        name: '北京揆理度势',
        appid: 'dasf3432533',
        oldid: '上海市普陀区金沙江路 1518 弄',
        time: '2018-02-23 10:32:34',
        state: 'true',
      },
    ],
  },
};
// Mock.mock(/\/api\/adverList/, mockdata.advertiser);
Mock.mock('/api/adverList', mockdata.advertiser);
