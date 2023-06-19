<template>
  <el-main v-loading="loading">
    <el-col :span="18" :offset="3">
      <el-form :model="genInsertSqlForm" label-width="140px">
        <el-form-item label="生成类型">
          <el-select v-model="genInsertSqlForm.opsClient" placeholder="请选择生成类型">
            <el-option v-for="client in opsClientDict" :label="client" :value="client"/>
          </el-select>
        </el-form-item>
        <el-form-item label="SQL创建语句(DDL)">
          <div ref="genInsertDdlSqlEditorContainer" style="min-height: 300px; width: 100%"></div>
          <div style="margin: 20px 0"/>
          <div style="margin: 20px 0"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button @click="cleanEditor">清空</el-button>
        </el-form-item>
        <el-form-item label="INSERT语句">
          <div ref="genInsertResultEditorContainer" style="min-height: 400px; width: 100%"></div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-main>
</template>

<script setup lang="ts">
import {ddlGenInsertSql} from "@/api/pgsqls";
import {listDaoOpsClient} from "@/api/dict";
import {onMounted, ref, toRaw} from "vue";
import * as monaco from "monaco-editor";
import {ElMessage} from 'element-plus'

const codeContent = ref("");
const opsClientDict = ref<any>(null);
const genInsertDdlSqlEditorContainer = ref<any>(null);
const genInsertResultEditorContainer = ref<any>(null);
const genInsertDdlSqlEditor = ref<any>(null);
const genInsertResultEditor = ref<any>(null);
const editorTheme = ref<string>("vs-dark");
const loading = ref(false);
// do not use same name with ref
const genInsertSqlForm = ref({
  opsClient: 'NamedParameterJdbcTemplate',
})

const onSubmit = () => {
  loading.value = true;
  const ddlSql = toRaw(genInsertDdlSqlEditor.value).getValue();
  const opsClient = genInsertSqlForm.value.opsClient;
  const data = {
    'ddlSql': ddlSql,
    'opsClient': opsClient,
  }
  ddlGenInsertSql(data).then(res => {
    loading.value = false;
    toRaw(genInsertResultEditor.value).setValue(res.data)
  }).catch(() => {
    loading.value = false;
  });
}

onMounted(() => {
  listDaoOpsClientHandle();
  ddlSqlEditorContainerInit();
  resultEditorContainerInit();
});

// 获取编辑框内容
function getCodeContext() {
  codeContent.value = toRaw(genInsertDdlSqlEditor.value).getValue();
  return console.log(codeContent.value);
}

function cleanEditor() {
  toRaw(genInsertDdlSqlEditor.value).setValue('');
  toRaw(genInsertResultEditor.value).setValue('');
}

function listDaoOpsClientHandle() {
  listDaoOpsClient().then(res => {
    opsClientDict.value = res.data;
  })
}

function ddlSqlEditorContainerInit() {
  genInsertDdlSqlEditor.value = monaco.editor.create(genInsertDdlSqlEditorContainer.value, {
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
  genInsertDdlSqlEditor.value.onDidChangeModelContent((e) => {
  });
  // console.log(editor.value, "监听内容变化");
  // 监听失去焦点事件
  genInsertDdlSqlEditor.value.onDidBlurEditorText(() => {
  });
}

function resultEditorContainerInit() {
  genInsertResultEditor.value = monaco.editor.create(genInsertResultEditorContainer.value, {
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
    readOnly: true, //是否只读  取值 true | false
  });
  // 监听内容变化
  genInsertResultEditor.value.onDidChangeModelContent((e) => {
  });
  // console.log(editor.value, "监听内容变化");
  // 监听失去焦点事件
  genInsertResultEditor.value.onDidBlurEditorText(() => {
  });
}
</script>

<style scoped>

</style>