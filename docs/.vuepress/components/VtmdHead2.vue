<template>
  <h2 :id="content" class="vtmd-h2"><a :href="`#${content}`" aria-hidden="true" class="header-anchor">#</a> {{content}}</h2>
</template>

<script>
export default {
  props: {
    content: String,
  }
}
</script>

<style>
.vtmd-h2 {
  font-size: 30px;
  line-height: 1.5;
  cursor: pointer;
  color: #000;
  border-bottom: 0;
}

.vtmd-h2:hover {
  color: #3eaf7c;
}
</style>
