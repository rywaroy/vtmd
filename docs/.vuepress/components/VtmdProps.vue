<template>
  <div class="vtmd-props">
    <vtmd-head3 :content="name"></vtmd-head3>
    <p class="vtmd-props__p" v-if="type">
      <span class="vtmd-props__title">类型：</span>
      {{type}}
    </p>
    <p class="vtmd-props__p" v-if="required">
      <span class="vtmd-props__title">required：</span>
      {{required}}
    </p>
  </div>
</template>

<script>
import VtmdHead3 from './VtmdHead3';

export default {
  props: {
    name: String,
    type: String,
    required: String,
  },
  compontents: {
    VtmdHead3,
  }
}
</script>

<style>
.vtmd-props__p {
  color: #666;
  margin: 10px 0;
}

.vtmd-props__title {
  color: #333;
  font-weight: bold;
  display: inline-block;
}
</style>
