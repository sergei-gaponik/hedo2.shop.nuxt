<template>
  <div class="a-container">
    <div class="a-inner">
      <div class="a-menu">
        <brand-menu
          v-if="brandFocus"
          @leave="$emit('leave')"
          class="mb2"
          :brands="brands"
        />
        <div v-else-if="category" class="a-left mb2">
          <div
            v-for="child in category.children"
            :key="child._id"
            class="a-col"
          >
            <span class="pointer" @click="href('/c/' + child.handle)">
              <h4>{{ child.title || child.name }}</h4>
            </span>
            <div class="a-subitems">
              <span @click="href('/c/' + child.handle)">{{
                $t("allProducts")
              }}</span>
              <span
                v-for="subChild in child.children"
                :key="subChild._id"
                @click="href('/c/' + subChild.handle)"
              >
                {{ subChild.title || subChild.name }}
              </span>
              <span @click="href('/c/' + child.handle + '?sale=1')">{{
                $t("saleCollection")
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandMenu from "./BrandMenu.vue";

export default {
  components: { BrandMenu },
  props: {
    category: Object,
    brandFocus: Boolean,
    brands: Array,
  },
  methods: {
    href(path) {
      this.$emit("leave");
      this.$router.push(this.localePath(path));
    },
  },
};
</script>

<style scoped>
.a-container {
  overflow: hidden;
  padding-bottom: 10px;
}
.a-inner {
  box-shadow: var(--box-shadow-drawer);
  background-color: white;
}

.a-menu {
  display: grid;
  grid-template-columns: 100%;
  z-index: 1;
  margin: auto;
  padding-top: var(--padding);
  width: calc(100vw - (var(--padding-x-td) * 2));
  max-width: var(--max-width-d);
}

.a-left {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.a-col {
  text-align: left;
}

.a-subitems {
  display: flex;
  flex-direction: column;
  line-height: 2.5rem;
}

.a-subitems span {
  cursor: pointer;
}
</style>
