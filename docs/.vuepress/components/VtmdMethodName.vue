<template>
  <h3 :id="name" class="vtmd-method">
    <span class="vtmd-method__name">{{name}}</span>
    <span class="vtmd-method__params" v-if="params">
      (<span class="vtmd-method__param">{{params}}</span>)
    </span>
    <span class="vtmd-method__returns" v-if="returns">
      <span class="vtmd-method__arrow">→</span>
      { <span class="vtmd-method__return">{{returns}}</span> }
    </span>
  </h3>
</template>

<script>
export default {
  props: {
    name: String,
    params: String,
    returns: String,
  }
}
</script>

<style>
.vtmd-method {
  font-size: 18px;
  line-height: 30px;
  color: #444;
  cursor: pointer;
  margin: 0;
}

.vtmd-method__name {
  color: #8ec225;
  font-family: Tahoma,Helvetica,Arial,sans-serif
}

.vtmd-method__param {
  color: #fd971f;
}

.vtmd-method__arrow {
  color: #ccc;
  font-size: 18px;
}

.vtmd-method__return {
  color: #59b3c3;
}
</style>
