<template>
  <div class="a-flex">
    <div>
      <check-box 
        :checked="checked"
        @input="v => handler(v)"
        small
        ref="checkbox"
        :required="true"
      />
    </div>
    <div>
      <span>
        {{ $t("cartPrivacyPolicy") }}
      </span>
      <nuxt-link :to="localePath('/privacy')" class="link-alt">
        {{ $t("moreDetails") }}
      </nuxt-link>
    </div>
  </div>
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

<style scoped>
.a-flex{
  display: flex;
  flex-wrap: nowrap;
  gap: var(--gap);
}
</style>