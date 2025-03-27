import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MonitoringDataVO, MonitoringDataForm, MonitoringDataQuery } from '@/api/system/monitoringData/types';

/**
 * 查询监测数据列表
 * @param query
 * @returns {*}
 */

export const listMonitoringData = (query?: MonitoringDataQuery): AxiosPromise<MonitoringDataVO[]> => {
  return request({
    url: '/system/monitoringData/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询监测数据详细
 * @param id
 */
export const getMonitoringData = (id: string | number): AxiosPromise<MonitoringDataVO> => {
  return request({
    url: '/system/monitoringData/' + id,
    method: 'get'
  });
};

/**
 * 新增监测数据
 * @param data
 */
export const addMonitoringData = (data: MonitoringDataForm) => {
  return request({
    url: '/system/monitoringData',
    method: 'post',
    data: data
  });
};

/**
 * 修改监测数据
 * @param data
 */
export const updateMonitoringData = (data: MonitoringDataForm) => {
  return request({
    url: '/system/monitoringData',
    method: 'put',
    data: data
  });
};

/**
 * 删除监测数据
 * @param id
 */
export const delMonitoringData = (id: string | number | Array<string | number>) => {
  return request({
    url: '/system/monitoringData/' + id,
    method: 'delete'
  });
};
