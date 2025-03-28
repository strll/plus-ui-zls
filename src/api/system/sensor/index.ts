import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SensorVO, SensorForm, SensorQuery } from '@/api/system/sensor/types';



export const pjsy = (): AxiosPromise<any> => {
  return request({
    url: '/system/zxt/pjsy',
    method: 'get'

  })as unknown as Promise<any>;
};


export const pjsz = (): AxiosPromise<any> => {
  return request({
    url: '/system/zxt/pjsz',
    method: 'get'

  });
};

export const dqsl = (): Promise<any[]> => {
  return request({
    url: '/system/zxt/dqsl',
    method: 'get'
  }) as unknown as Promise<any[]>; // 双重断言
};

export const szpf = (): Promise<any> => {
  return request({
    url: '/system/zxt/szpf',
    method: 'get'
  }) as unknown as Promise<any>;
};









/**
 * 查询硬件列表
 * @param query
 * @returns {*}
 */

export const listSensor = (query?: SensorQuery): AxiosPromise<SensorVO[]> => {
  return request({
    url: '/system/sensor/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询硬件详细
 * @param id
 */
export const getSensor = (id: string | number): AxiosPromise<SensorVO> => {
  return request({
    url: '/system/sensor/' + id,
    method: 'get'
  });
};

/**
 * 新增硬件
 * @param data
 */
export const addSensor = (data: SensorForm) => {
  return request({
    url: '/system/sensor',
    method: 'post',
    data: data
  });
};

/**
 * 修改硬件
 * @param data
 */
export const updateSensor = (data: SensorForm) => {
  return request({
    url: '/system/sensor',
    method: 'put',
    data: data
  });
};

/**
 * 删除硬件
 * @param id
 */
export const delSensor = (id: string | number | Array<string | number>) => {
  return request({
    url: '/system/sensor/' + id,
    method: 'delete'
  });
};
