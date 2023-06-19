<template>
  <el-main v-loading="loading">
    <el-col :span="18" :offset="3">
      <el-form :model="toUnderlineCaseForm" label-width="140px">
        <el-form-item label="驼峰字符">
          <el-input
              v-model="toUnderlineCaseForm.text"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 25}"
              placeholder="请输入"
          />
          <div style="margin: 20px 0"/>
        </el-form-item>
<!--        <el-form-item label="拼接符">-->
<!--          <el-input-->
<!--              v-model="toUnderlineCaseForm.separator"-->
<!--              placeholder="请输入拼接符"-->
<!--          />-->
<!--          <div style="margin: 20px 0"/>-->
<!--        </el-form-item>-->
        <el-form-item label="输出结果大小写" prop="upperCase">
        <el-switch
            v-model="toUnderlineCaseForm.upperCase"
            class="mt-2"
            inline-prompt
            active-text="大写"
            inactive-text="小写"
        />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button @click="cleanEditor">清空</el-button>
        </el-form-item>
        <el-form-item label="结果">
          <el-input
              v-model="toUnderlineCaseForm.handleResult"
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
import {toUnderlineCase} from "@/api/zifu";
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
const toUnderlineCaseForm = ref({
  text: '',
  upperCase: 0,
  handleResult: '',
})

const onSubmit = () => {
  loading.value = true;
  const data = {
    'text': toUnderlineCaseForm.value.text,
    'upperCase': toUnderlineCaseForm.value.upperCase,
  }
  toUnderlineCase(data).then(res => {
    loading.value = false;
    toUnderlineCaseForm.value.handleResult = res.data;
  }).catch(() => {
    loading.value = false;
  });
}

onMounted(() => {
});

function cleanEditor() {
  toUnderlineCaseForm.value.handleResult = '';
  toUnderlineCaseForm.value.text = '';
}
</script>

<style scoped>

</style>