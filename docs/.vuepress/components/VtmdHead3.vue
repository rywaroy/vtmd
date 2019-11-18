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
  font-size: 18px;
  line-height: 28px;
  cursor: pointer;
  color: #3eaf7c;
  margin: 0;
}

.vtmd-h3:hover {
  color: #3eaf7c;
}
</style>
