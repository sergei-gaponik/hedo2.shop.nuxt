<template>
  <check-box 
    :checked="checked"
    @input="v => handler(v)"
    required
  >
    <span>
      {{ $t("cartPrivacyPolicy") }}
    </span>
    <nuxt-link :to="localePath('/privacy')" class="link-alt">
      {{ $t("moreDetails") }}
    </nuxt-link>
  </check-box>
</template>

<script>
import CheckBox from '~/components/layout/inputs/CheckBox.vue'

export default {
  components: { CheckBox },
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: [ "checked" ],
  data(){
    return {
      lock: false
    }
  },
  methods: {
    handler(v){
      if(this.lock) return;

      this.lock = true;

      this.$emit("input", v)

      setTimeout(() => this.lock = false, 100)
    }
  }
}
</script>