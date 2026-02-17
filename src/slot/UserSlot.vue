<template>
  <div v-if="visibleProp">
    <BaseLayout>
      <!-- 插槽使用方需要用template包裹 -->
      <template #header>
        <p>Here might be a page title</p>
      </template>
  
      <template #default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>
  
      <template #footer>
        <p>Here's some contact info</p>
      </template>
  
      <template #[dynamicSlotName]>
        <p>Here's some contact info</p>
      </template>
  
      <!-- 通过作用域插槽读取子组件数据 -->
      <template #scope="slotProps">
        <p>slotProps: {{slotProps}}</p>
        <p>text: {{slotProps.text}}</p>
        <p>count: {{slotProps.count}}</p>
      </template>
    </BaseLayout>
  
    <CircleLayout>
      <!-- #循环插槽 -->
      <template #itemV1="props">
        <div class="item">
          <p>{{ props.data.body }}</p>
          <p class="meta">by {{ props.data.username }} | {{ props.data.likes }} likes</p>
        </div>
      </template>
      <!-- #循环插槽-->
      <template #itemV2="{ body, username, likes }">
        <div class="item">
          <p>{{ body }}</p>
          <p class="meta">by {{ username }} | {{ likes }} likes</p>
        </div>
      </template>
    </CircleLayout>

    <!-- 无渲染组件 -->
    <MouseTracker v-slot="{ x, y }">
      Mouse is at: {{ x }}, {{ y }}
    </MouseTracker>
  </div>
</template>

<script>

import BaseLayout from './BaseLayout.vue'
import CircleLayout from './CircleLayout.vue'
import MouseTracker from './MouseTracker.vue'
export default {
  name: 'UserSlot',
  components: {
    BaseLayout,
    CircleLayout,
    MouseTracker
  },
  props: {
    visibleProp: Boolean
  },
  data() {
    return {
      dynamicSlotName: 'footer'
    }
  }
}

</script>

<style scoped>
.meta {
  font-size: 0.8em;
  color: #42b883;
}
</style>