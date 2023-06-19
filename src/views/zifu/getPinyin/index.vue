<template>
  <el-main v-loading="loading">
    <el-col :span="18" :offset="3">
      <el-form :model="genPinyinFirstForm" label-width="140px">
        <el-form-item label="汉字">
          <el-input
              v-model="genPinyinFirstForm.text"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 25}"
              placeholder="请输入汉字"
          />
          <div style="margin: 20px 0"/>
        </el-form-item>
        <el-form-item label="拼接符">
          <el-input
              v-model="genPinyinFirstForm.separator"
              placeholder="请输入拼接符"
          />
          <div style="margin: 20px 0"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button @click="cleanEditor">清空</el-button>
        </el-form-item>
        <el-form-item label="结果">
          <el-input
              v-model="genPinyinFirstForm.pinyin"
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
import {getPinyin} from "@/api/zifu";
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
const genPinyinFirstForm = ref({
  text: '',
  separator: '',
  pinyin: '',
})

const onSubmit = () => {
  loading.value = true;
  const data = {
    'text': genPinyinFirstForm.value.text,
    'separator': genPinyinFirstForm.value.separator,
  }
  getPinyin(data).then(res => {
    loading.value = false;
    genPinyinFirstForm.value.pinyin = res.data;
  }).catch(() => {
    loading.value = false;
  });
}

onMounted(() => {
});

function cleanEditor() {
  genPinyinFirstForm.value.pinyin = '';
  genPinyinFirstForm.value.text = '';
}
</script>

<style scoped>

</style>