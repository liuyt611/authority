import axios from 'axios';


let cancel;
const promiseArr = {};
const CancelToken = axios.CancelToken;
// TODO 设置 header authentication
// 请求拦截器
axios.interceptors.request.use((config) => {
    // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = cancel;
  }
  return config;
}, error => Promise.reject(error));

// // 响应拦截器即异常处理
axios.interceptors.response.use(response => response, (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
  } else {
    error.message = '连接到服务器失败';
  }
  return Promise.resolve(error.response);
});

axios.defaults.baseURL = '/api/v1';
// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  Authentication: localStorage.token || '',
};
axios.defaults.timeout = 10000;

/**
 *
 * @param {String} type [自定义事件]
 * @param {Object} data [自定义数据]
 * @returns {Null} none
 */
function fire(type, data) {
  const eve = new CustomEvent('warning', { detail: data });
  document.getElementById('messbox').dispatchEvent(eve);
}
// add broadcast


/**
 *
 * @param {Array} data [DATA]
 * @param {Object} opt [{key:,value:}}]
 * @returns {Object} [ RETURN ]
 */
export function arrToDic(data, opt) {
  const dic = {};
  const opts = Object.assign({
    key: 'id',
    value: 'val',
  }, opt);
  for (let i = 0; i < data.length; i++) {
    dic[data[i][opts.key]] = data[i][opts.value];
  }
  return dic;
}
/**
 *
 * @param {Number} num [输入分]
 * @returns {Number} [返回元]
 */
export function formatMoney(num) {
  return num / 100;
}

/**
 *   get请求
 * @param {String} url [ajax URL]
 * @param {Object} param [参数]
 * @param {Boolean} bAllData [是否返回所有axios封装的数据]
 * @returns {Promise} []
 */
export function get(url, param, bAllData) {
  const b = bAllData || false;
  return new Promise((resolve) => {
    axios({
      method: 'get',
      url,
      params: param,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }).then((res) => {
      const data = res.data;
      if (data.status === 0) {
        const req = b ? res : data.data;
        resolve(req);
      } else {
        console.warn(data.msg);
      }
    });
  });
}

/**
 *   post请求
 * @param {String} url [ajax URL]
 * @param {Object} param [参数]
 * @param {Boolean} bAllData [是否返回所有axios封装的数据]
 * @returns {Promise} []
 */
export function post(url, param, bAllData) {
  const b = bAllData || false;
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url,
      data: param,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }).then((res) => {
      const data = res.data;
      console.log('data', res);
      if (data.status === 0) {
        const req = b ? res : data.data;
        resolve(req);
      } else {
        fire('waring', { msg: data.msg });
        console.warn(data.msg);
      }
    });
  });
}
