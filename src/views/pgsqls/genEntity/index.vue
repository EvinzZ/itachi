<template>
  <el-main v-loading="loading">
    <el-col :span="18" :offset="3">
      <el-form
          :model="sqlForm"
          ref="sqlFormRef"
          label-width="140px"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item label="生成类型" prop="opsClient">
          <el-select v-model="sqlForm.opsClient" placeholder="请选择生成类型">
            <el-option v-for="client in opsClientDict" :label="client" :value="client"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Lomboks" prop="useLombok">
          <el-switch
              v-model="sqlForm.useLombok"
              class="mt-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
          />
        </el-form-item>
        <el-form-item label="SQL创建语句(DDL)">
          <div ref="ddlSqlEditorContainer" style="min-height: 300px; width: 100%"></div>
          <div style="margin: 20px 0"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button @click="cleanEditor">清空</el-button>
        </el-form-item>
        <el-form-item label="实体(生成结果)">
          <div ref="resultEditorContainer" style="min-height: 400px; width: 100%"></div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-main>
</template>

<script setup lang="ts">
import {ddlGenEntity} from "@/api/pgsqls";
import {onMounted, ref, toRaw} from "vue";
import * as monaco from "monaco-editor";
import {ElMessage} from 'element-plus'
import {Check, Close} from '@element-plus/icons-vue'
import {listDevLanOpsClient} from "@/api/dict";

const codeContent = ref("");
const ddlSqlEditorContainer = ref<any>(null);
const resultEditorContainer = ref<any>(null);
const ddlSqlEditor = ref<any>(null);
const resultEditor = ref<any>(null);
const editorTheme = ref<string>("vs-dark");
const loading = ref(false);
const opsClientDict = ref<any>(null);
// do not use same name with ref
const sqlForm = ref({
  opsClient: 'Java',
  useLombok: true
})

const onSubmit = () => {
  loading.value = true;
  const ddlSql = toRaw(ddlSqlEditor.value).getValue();
  const data = {
    'ddlSql': ddlSql,
    'opsClient': sqlForm.value.opsClient,
    'useLombok': sqlForm.value.useLombok,
  }
  ddlGenEntity(data).then(res => {
    loading.value = false;
    toRaw(resultEditor.value).setValue(res.data)
  }).catch(() => {
    loading.value = false;
  });
}

onMounted(() => {
  listDevLanOpsClientHandler();
  ddlSqlEditorContainerInit();
  resultEditorContainerInit();
});

function listDevLanOpsClientHandler() {
  listDevLanOpsClient().then(res => {
    opsClientDict.value = res.data;
  })
}

// 获取编辑框内容
function getCodeContext() {
  codeContent.value = toRaw(ddlSqlEditor.value).getValue();
  return console.log(codeContent.value);
}

function cleanEditor() {
  toRaw(ddlSqlEditor.value).setValue('');
  toRaw(resultEditor.value).setValue('');
}

function ddlSqlEditorContainerInit() {
  ddlSqlEditor.value = monaco.editor.create(ddlSqlEditorContainer.value, {
    value: "",
    theme: editorTheme.value, // 主题
    language: "sql",
    folding: true, // 是否折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
    showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    readOnly: false, //是否只读  取值 true | false
  });
  // 监听内容变化
  ddlSqlEditor.value.onDidChangeModelContent((e) => {
  });
  // console.log(editor.value, "监听内容变化");
  // 监听失去焦点事件
  ddlSqlEditor.value.onDidBlurEditorText(() => {
  });
}

function resultEditorContainerInit() {
  resultEditor.value = monaco.editor.create(resultEditorContainer.value, {
    value: "",
    theme: editorTheme.value, // 主题
    language: "java",
    folding: true, // 是否折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
    showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    readOnly: true, //是否只读  取值 true | false
  });
  // 监听内容变化
  resultEditor.value.onDidChangeModelContent((e) => {
  });
  // console.log(editor.value, "监听内容变化");
  // 监听失去焦点事件
  resultEditor.value.onDidBlurEditorText(() => {
  });
}
</script>

<style scoped>

</style>