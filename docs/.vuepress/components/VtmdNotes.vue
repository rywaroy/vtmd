<template>
  <div class="vtmd-notes">
    <p class="vtmd-notes__p" v-if="version"><span class="vtmd-notes__title">{{versionCn}} :</span> {{version}}</p>
    <p class="vtmd-notes__p" v-if="author"><span class="vtmd-notes__title">{{authorCn}} :</span> {{author}}</p>
    <p class="vtmd-notes__p" v-if="url"><span class="vtmd-notes__title">{{urlCn}} :</span> {{url}}</p>
    <div class="vtmd-notes__img" v-if="image">
      <div class="vtmd-notes__title">{{imageCn}} :</div>
      <img :src="image" alt="" class="vtmd-notes__images">
    </div>
    <p class="vtmd-notes__txt" v-if="txt">{{txt}}</p>
  </div>
</template>

<script>
export default {
  props: {
    intro: String,
    introCn: String,
    version: String,
    versionCn: String,
    author: String,
    authorCn: String,
    url: String,
    urlCn: String,
    image: String,
    imageCn: String,
    txt: String,
  }
}
</script>

<style>
.vtmd-notes {
  font-size: 16px;
  line-height: 32px;
}

.vtmd-notes__p {
  color: #888;
  margin: 10px 0;
}

.vtmd-notes__title {
  color: #333;
  font-weight: bold;
  display: inline-block;
  width: 66px;
}

.vtmd-notes__images {
  max-width: 100%;
  margin-top: 10px;
}

.vtmd-notes__txt {
  font-size: 16px;
  line-height: 28px;
  color: #666;
  background: #eee;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
