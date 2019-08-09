import axios from 'axios';
import Qs from 'qs';
import {
  API_CONFIG,HOST_CONFIG
} from '../constants/Urls';
import {refreshTokenTimer} from '../actions/main';
import {store} from '../index';
import myStore from '../utils/store';
axios.defaults.baseURL = HOST_CONFIG;
axios.defaults.timeout = 2500;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getCustomizeInfo = (id, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getCustomizeInfo,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data:{
        id:id
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }]
    })
    .then((response) => {
      successCB && successCB(response.data);
    }).catch((error) => {
      errorCB && errorCB(error);
    })
}

export const addResumeAllInfo = (obj, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.addResumeAllInfo,
      headers: {
        'Content-Type': 'application/json',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data:obj
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getSchoolListNew = (nextUrl,orgName,successCB, errorCB) => {
  axios({
      method: 'POST',
      url: nextUrl || API_CONFIG.getSchoolListNew,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data:{
				orgName:orgName
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getMyResume = (successCB, errorCB) => {
  axios({
      method: 'GET',
      url: API_CONFIG.getMyResume,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const sendCheckMsg = (phone, smsType, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.sendCheckMsg,
      data: {
        phone: phone,
        smsType: smsType
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      successCB && successCB(response.data);
    }).catch((error) => {
      errorCB && errorCB(error);
    })
}
export const userRegisterNjqc = (phone, verificationCode, userPassword, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.userRegisterNjqc,
      data: {
        phone: phone,
				verificationCode: verificationCode,
				userPassword: userPassword
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      successCB && successCB(response.data);
    }).catch((error) => {
      errorCB && errorCB(error);
    })
}
export const login = (userName, password, gPassword, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.login,
      data: {
        userName: userName,
				passWord: password,
				gPassWord: gPassword
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      successCB && successCB(response.data);
    }).catch((error) => {
      errorCB && errorCB(error);
    })
}
export const forgotPwd = (verificationCode, loginName, userPassword, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.forgotPwd,
      data: {
        verificationCode: verificationCode,
				loginName: loginName,
				userPassword: userPassword
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      successCB && successCB(response.data);
    }).catch((error) => {
      errorCB && errorCB(error);
    })
}
export const tokenExchange = (successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.tokenExchange,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      // store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getAreaListNew = (positionType,successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getAreaListNew,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data:{
				positionType:positionType
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getJobListPage = (name,type,industry,area,pageNo, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getJobListPage,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data:{
				name: name,
				positionType:type,
				positionTagId:industry,
				orgId:area,
				pageNo:pageNo
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getCollectListPc = (pageNo, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getCollectListPc,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data: {
				pageNo:pageNo
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getPcSendList = (successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getPcSendList,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getJobDetail = (id, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getJobDetail,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data: {
				id: id
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const getPositionDeliverDetail = (id, deliverId, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.getPositionDeliverDetail,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data: {
        id: id,
        deliverId: deliverId
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const sendResume = (positionId, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.sendResume,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data: {
				positionId: positionId
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const collectJob = (id, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.collectJob,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data: {
				id: id
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}
export const cancelCollectJob = (id, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.cancelCollectJob,
      crossDomain:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': JSON.parse(myStore.get("userInfo")).token,
      },
      data: {
				id: id
			},
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      store.dispatch(refreshTokenTimer());
      successCB && successCB(response.data);
    }).catch((error) => {
      //method.checkToken(error,errorCB)
    })
}

