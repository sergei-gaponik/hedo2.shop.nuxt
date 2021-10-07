<template>
<div>
  <div class="a-footer">
    <div class="a-footer-inner">
      <div class="a-flex-item a-menu-bg">
        <menu-button height="22" color="#ffffff" px="15" py="0" :action="toggleMenuDrawer" />
      </div>
      <div class="a-tags hide-scrollbar">
        <footer-tag 
          v-for="(footerTag, i) in footerTags" 
          :key="i" 
          :href="footerTag.href"
          :name="footerTag.name"
          class="a-flex-item"
        />
      </div>
    </div>
  </div>
  <div style="margin-bottom:46px"></div>
</div>
</template>

<script>
import MenuButton from '~/components/layout/buttons/MenuButton.vue'
import FooterTag from './FooterTag.vue'

export default {
  components: { MenuButton, FooterTag },
  computed: {
    footerTags(){
      return [
        {
          name: this.$t("home"),
          href: this.localePath("/")
        },
        {
          name: this.$t("brands"),
          href: this.localePath("/b")
        },
        {
          name: this.$t("saleCollection"),
          href: this.localePath("/c/sale")
        },
        {
          name: this.$t("discover"),
          href: this.localePath("/c")
        }
      ]
    }
  },
  methods: {
    toggleMenuDrawer(){
      this.$store.commit('search/reset')
      this.$store.commit('nav/toggleMenuDrawer')
    }
  },
}
</script>

<style scoped>
.a-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: var(--footer-y-m);
  background-color: white;
  z-index: 100;
}
.a-footer-inner{
  background-color: var(--c-green-3);
  width: 100%;
  overflow-x: scroll;
  height: 100%;
  display: flex;
  padding: 0 var(--padding-x-m);
  align-items: center;
}
.a-flex-item{
  flex-shrink: 0;
}
.a-tags{
  width: calc(100% - var(--padding-x-m) - 52px);
  display:flex;
  overflow:scroll;
  align-items: center;
  gap: 5px;
  border-radius: 25px 0 0 25px;
}
</style>