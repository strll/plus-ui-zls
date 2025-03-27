import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SensorVO, SensorForm, SensorQuery } from '@/api/system/sensor/types';

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
