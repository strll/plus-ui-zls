export interface SensorVO {
  /**
   *
   */
  id: string | number;

  /**
   * 传感器状态
   */
  state: string;

  /**
   * 位置
   */
  place: string;

  /**
   * 备注
   */
  remarks: string;

  /**
   * 名称
   */
  name: string;

}

export interface SensorForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 传感器状态
   */
  state?: string;

  /**
   * 位置
   */
  place?: string;

  /**
   * 备注
   */
  remarks?: string;

  /**
   * 名称
   */
  name?: string;

}

export interface SensorQuery extends PageQuery {

  /**
   * 传感器状态
   */
  state?: string;

  /**
   * 位置
   */
  place?: string;

  /**
   * 备注
   */
  remarks?: string;

  /**
   * 名称
   */
  name?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}



