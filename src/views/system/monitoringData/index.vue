<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="编号" prop="sensorId">
              <el-input v-model="queryParams.sensorId" placeholder="请输入传感器编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="水流量" prop="flowRate">
              <el-input v-model="queryParams.flowRate" placeholder="请输入水流量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="水压" prop="pressure">
              <el-input v-model="queryParams.pressure" placeholder="请输入水压" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="水质指数" prop="qualityIndex">
              <el-input v-model="queryParams.qualityIndex" placeholder="请输入水质指数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="记录时间" prop="timestamp">
              <el-date-picker clearable
                v-model="queryParams.timestamp"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择记录时间"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:monitoringData:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:monitoringData:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:monitoringData:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:monitoringData:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="monitoringDataList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
<!--        <el-table-column label="" align="center" prop="id" v-if="true" />-->
        <el-table-column label="传感器名称" align="center" prop="sensorName" />
        <el-table-column label="水流量" align="center" prop="flowRate" />
        <el-table-column label="水压" align="center" prop="pressure" />
        <el-table-column label="水质指数" align="center" prop="qualityIndex" />
        <el-table-column label="记录时间" align="center" prop="timestamp" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.timestamp, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:monitoringData:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:monitoringData:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改监测数据对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="monitoringDataFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="传感器编号" prop="sensorId">
          <el-input v-model="form.sensorId" placeholder="请输入传感器编号" />
        </el-form-item>
        <el-form-item label="水流量" prop="flowRate">
          <el-input v-model="form.flowRate" placeholder="请输入水流量" />
        </el-form-item>
        <el-form-item label="水压" prop="pressure">
          <el-input v-model="form.pressure" placeholder="请输入水压" />
        </el-form-item>
        <el-form-item label="水质指数" prop="qualityIndex">
          <el-input v-model="form.qualityIndex" placeholder="请输入水质指数" />
        </el-form-item>
        <el-form-item label="记录时间" prop="timestamp">
          <el-date-picker clearable
            v-model="form.timestamp"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择记录时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="MonitoringData" lang="ts">
import { listMonitoringData, getMonitoringData, delMonitoringData, addMonitoringData, updateMonitoringData } from '@/api/system/monitoringData';
import { MonitoringDataVO, MonitoringDataQuery, MonitoringDataForm } from '@/api/system/monitoringData/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const monitoringDataList = ref<MonitoringDataVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const monitoringDataFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MonitoringDataForm = {
  id: undefined,
  sensorId: undefined,
  flowRate: undefined,
  pressure: undefined,
  qualityIndex: undefined,
  timestamp: undefined,
}
const data = reactive<PageData<MonitoringDataForm, MonitoringDataQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    sensorId: undefined,
    flowRate: undefined,
    pressure: undefined,
    qualityIndex: undefined,
    timestamp: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询监测数据列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMonitoringData(queryParams.value);
  monitoringDataList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  monitoringDataFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: MonitoringDataVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加监测数据";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MonitoringDataVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMonitoringData(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改监测数据";
}

/** 提交按钮 */
const submitForm = () => {
  monitoringDataFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMonitoringData(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMonitoringData(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MonitoringDataVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除监测数据编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMonitoringData(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('system/monitoringData/export', {
    ...queryParams.value
  }, `monitoringData_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
