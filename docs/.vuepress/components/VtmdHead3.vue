<template>
  <div class="vtmd-props__box">
    <h3 :id="content" class="vtmd-h3"><a :href="`#${content}`" aria-hidden="true" class="header-anchor">#</a> {{content}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    content: ''
  },
}
</script>

<style>
.vtmd-h3 {
  font-size: 24px;
  line-height: 36px;
  color: #444;
  cursor: pointer;
}

.vtmd-h3:hover {
  color: #3eaf7c;
}
</style>
