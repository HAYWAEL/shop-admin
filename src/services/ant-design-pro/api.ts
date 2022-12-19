// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return {
    name: 'Hey',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    access: localStorage.getItem('admin')==='admin'?"admin":'',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  }
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/login/outLogin', {
  //   method: 'POST',
  //   ...(options || {}),
  // });
  localStorage.removeItem('token')
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function homeIndex(options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/home/index', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function merchantBanlance(params: {
  page?: number;
  size?: number;
  channelId?: string;
  merchantId?: string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/home/merchant/banlance/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function sysLog(params: {
  page?: number;
  size?: number;
  opt?: string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/sys/log/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function channel(params: {
  page?: number;
  size?: number;
  name?: string;
  type?: string;
  payType?: string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/payChannel/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function channelType(options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/payChannel/type', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function channelMerchant(params: {
  page?: number;
  size?: number;
  channelId?: string;
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/getListbyChannel', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addChannel(params: {
  "type": string,
  "name": string,
  "payType": string,
  "extra": string,
  "remark": string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/payChannel/create', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function updateChannel(params: {
  "type": string,
  "name": string,
  "payType": string,
  "status": number,
  "extra": string,
  "remark": string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/payChannel/update', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function switchChannel(params: {
  "channelId": number,
  "toChannelId": number,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/payChannel/switch', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function merchant(params: {
  page?: number;
  size?: number;
  merchantId?: string;
  agencyId?: string;
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addMerchant(params: {
  "settleRatio": string,
  "payoutRatio": string,
  "payoutSingleTrans": string,
  "agencyId": string,
  "agencySingleTrans": string,
  "agencyRatio": string,
  "channelRatio": string,
  "channelFee": string,
  "ips": string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/create', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateMerchant(params: {
  "settleRatio": string,
  "payoutRatio": string,
  "payoutSingleTrans": string,
  "agencyId": string,
  "agencySingleTrans": string,
  "agencyRatio": string,
  "channelRatio": string,
  "channelFee": string,
  "ips": string,
  "id": number,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/update', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function rechargeMerchant(params: {
  "amount": string,
  "ramount": string,
  "payoutRatio": number,
  "merchantId": number,
  "remark": string,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/recharge', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function merchantChannel(params: {
  page?: number;
  size?: number;
  merchantId: string;
  agencyId?: string;
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/channel/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addMerchantChannel(params: {
  "merchantId": string,
  "payChannelId": string,
  "dayPayLimit": string,
  "payType": string,
  "remark": string,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/channel/add', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateMerchantChannel(params: {
  "id": string,
  status?: number,
  "valid"?: number,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchant/channel/update', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function rechargeLog(params: {
  page?: number;
  size?: number;
  merchantId: string;
  start?: string;
  end?: string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchantRecharge/getRechargeLog', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function cancleRechargeLog(params: {
  "id": string,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchantRecharge/cancle', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function rechargeLogS(params: {
  "merchantId": string,
  start: string,
  end: string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchantRecharge/listStatistic', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function payoutList(params: { [key: string]: string }, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/merchantOrder/getPayoutList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function statisticPayout(params: {
  start: string,
  end: string
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/settlement/getPayoutlist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function agency(params: {
  page?: number;
  size?: number;

}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/agencyId/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addAgency(params: {
  "agencyName": string,
  "remark": string,
}, options?: { [key: string]: any }) {
  return request<API.HomeIndex>('/api/agencyId/add', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}


