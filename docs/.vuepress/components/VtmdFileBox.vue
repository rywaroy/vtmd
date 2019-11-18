<template>
  <div :class="['vtmd__umi__index', hide ? 'hide' : '']">
        <div class="vtmd__umi__filename">
            {{filename}}
          <img src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="vtmd__umi__icon" v-if="hide" @click="hide = false">
          <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="vtmd__umi__icon" v-else @click="hide = true">
        </div>
      <slot></slot>
      <div class="vtmd__umi__show" v-if="hide" @click="hide = false">—— 展开 ——</div>
      <div class="vtmd__umi__show" v-else @click="hide = true">—— 收起 ——</div>
  </div>
</template>

<script>
export default {
    props: {
        filename: String
    },
    data() {
        return {
            hide: true
        }
    }
}
</script>·

<style>
.vtmd__umi__index {
  background: #f9f9f9;
  padding: 10px 40px 20px;
  border-radius: 8px;
  position: relative;
  min-height: 200px;
  margin-bottom: 20px;
}

.vtmd__umi__index.hide {
    height: 200px;
    overflow: hidden;
}

.vtmd__umi__filename {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 16px;
  line-height: 1;
  color: #aaa;
}

.vtmd__umi__show {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: #1890ff;
}

.vtmd__umi__icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 10px;
    opacity: .45;
}

.vtmd__umi__icon:hover {
    opacity: 1;
}
</style>