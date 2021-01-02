export default {
  props: {
    to: {
      type: String,
      rquired: true
    },
    tag: {
      type: String
    }
  },
  render(h) {
    let tag = this.tag || 'a'
    let handler = () => {
      this.$router.push(this.to)
    }
  return <tab onClick={handler}>{this.$slots.default}</tab>
  }

}