<template>
  <div>Example</div>
</template>

<script>
/**
 * @intro 这是介绍
 * @version 1.1.1
 * @author zhangzhihao
 * @url www.3zsd.com
 * @image ./images/1.jpeg
 * @param {string} apple - name.
 * @param {string} banana - name.
 * @returns {Number} Sum of a and b
 * 文本
 * 文本2
 */

// @version 1.1.1
// @url www.3zsd.com
// @image ./images/1.jpeg
export default {
  name: 'about',
  props: {
    // 这是苹果
    apple: String,

    // 这是香蕉
    banana: {
      type: String,
      default: 'banana',
      required: true,
    }
  },
  data() {
    return {
      apple: 'apple', // 这是苹果
      banana: 1, // 这是香蕉
      fruits: { // 这是水果
        peach: 'peach',
      }
    }
  },
  methods: {
    /**
     * 吃
     * @param {String} name - 水果名字
     * @param {String} color - 水果颜色
     * @returns {String} 返回水果名字
     */
    eat(name, color) {
      return name;
    }
  },
  computed: {
    // 价格
    // @returns {Number} 返回的价格
    price() {
      
    },
    ...mapState({
      // 重量
      weight: state => state.weight,
      // 颜色
      color: state => state.color,
    }),
  },
  filters: {
    /**
     * 带上单位
     * @param {Number} value - 重量g
     * @returns {String} -重量
     */
    weight(value) {
      if (value >= 1000) {
        return `${value / 1000}kg`
      }
      return `${value}g`
    }
  },
  watch: {
    // 监听颜色变化
    color() {
      return this.color;
    }
  }
}
</script>

<style>

</style>
