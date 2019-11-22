<template>
  <h2 :id="content" :class="['vtmd-h2', {'border': border === '1'}]"><a :href="`#${content}`" aria-hidden="true" class="header-anchor">#</a> {{content}}</h2>
</template>

<script>
export default {
  props: {
    content: String,
    border: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style>
.vtmd-h2 {
  font-size: 30px;
  line-height: 1.5;
  cursor: pointer;
  color: #000;
  padding-bottom: 10px;
  border-bottom: 0;
}

.vtmd-h2.border {
  border-bottom: 1px solid #ddd;
}

.vtmd-h2:hover {
  color: #3eaf7c;
}
</style>
