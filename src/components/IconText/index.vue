<script setup>
import { computed } from '@vue/reactivity'
defineProps(['icon', 'text'])
</script>
<template>
    <span class="align">
        <el-icon>
            <component :is="icon"></component>
        </el-icon>
        <span class="mar">{{ text }}</span>
    </span>
</template>
<style scoped>
.align {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mar {
  margin-left: 3px;
}
</style>