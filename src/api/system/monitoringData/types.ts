export interface MonitoringDataVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 传感器编号
   */
  sensorId: string | number;

  /**
   * 水流量（L/min）
   */
  flowRate: number;

  /**
   * 水压（MPa）
   */
  pressure: number;

  /**
   * 水质指数（0-100）
   */
  qualityIndex: number;

  /**
   * 记录时间
   */
  timestamp: string;

}

export interface MonitoringDataForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 传感器编号
   */
  sensorId?: string | number;

  /**
   * 水流量（L/min）
   */
  flowRate?: number;

  /**
   * 水压（MPa）
   */
  pressure?: number;

  /**
   * 水质指数（0-100）
   */
  qualityIndex?: number;

  /**
   * 记录时间
   */
  timestamp?: string;

}

export interface MonitoringDataQuery extends PageQuery {

  /**
   * 传感器编号
   */
  sensorId?: string | number;

  /**
   * 水流量（L/min）
   */
  flowRate?: number;

  /**
   * 水压（MPa）
   */
  pressure?: number;

  /**
   * 水质指数（0-100）
   */
  qualityIndex?: number;

  /**
   * 记录时间
   */
  timestamp?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



