<template>
  <el-main v-loading="loading">
    <el-col :span="18" :offset="3">
      <el-form :model="toCamelCaseForm" label-width="140px">
        <el-form-item label="下划线字符">
          <el-input
              v-model="toCamelCaseForm.text"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 25}"
              placeholder="请输入"
          />
          <div style="margin: 20px 0"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button @click="cleanEditor">清空</el-button>
        </el-form-item>
        <el-form-item label="结果">
          <el-input
              v-model="toCamelCaseForm.handleResult"
              type="textarea"
              autosize
              readonly
              placeholder="此处为回显结果，不要在这里填写内容"
          />
        </el-form-item>
      </el-form>
    </el-col>
  </el-main>
</template>

<script setup lang="ts">
import {toCamelCase} from "@/api/zifu";
import {onMounted, ref, toRaw} from "vue";
import * as monaco from "monaco-editor";

const codeContent = ref("");
const opsClientDict = ref<any>(null);
const genInsertDdlSqlEditorContainer = ref<any>(null);
const genInsertResultEditorContainer = ref<any>(null);
const genInsertDdlSqlEditor = ref<any>(null);
const genInsertResultEditor = ref<any>(null);
const editorTheme = ref<string>("vs-dark");
const loading = ref(false);
// do not use same name with ref
const toCamelCaseForm = ref({
  text: '',
  separator: '',
  handleResult: '',
})

const onSubmit = () => {
  loading.value = true;
  const data = {
    'text': toCamelCaseForm.value.text
  }
  toCamelCase(data).then(res => {
    loading.value = false;
    toCamelCaseForm.value.handleResult = res.data;
  }).catch(() => {
    loading.value = false;
  });
}

onMounted(() => {
});

function cleanEditor() {
  toCamelCaseForm.value.handleResult = '';
  toCamelCaseForm.value.text = '';
}
</script>

<style scoped>

</style>