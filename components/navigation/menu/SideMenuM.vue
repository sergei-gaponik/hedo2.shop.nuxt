<template>
  <div>
    <div class="mb2" v-if="authReady">
      <div v-if="!isAuthenticated">
        <primary-button :to="localePath('/login')">
          {{ $t("signIn") }}
        </primary-button>
      </div>
      <div v-else>
        <nuxt-link
          :to="localePath('/me')"
          @click.native="$store.commit('nav/closeAllDrawers')"
        >
          <h6 class="a-greeting">{{ $t("welcomeBack") + " " + firstName }}</h6>
        </nuxt-link>
      </div>
    </div>

    <div class="a-items">
      <side-menu-item
        v-for="menuItem in menuItems"
        :key="menuItem.handle"
        :menuItem="menuItem"
        :expanded="expanded"
        @expand="expand(menuItem.handle)"
        @collapse="collapse(menuItem.handle)"
        showAll
      >
        <side-menu-sub-item
          v-for="child in menuItem.children"
          :key="child.handle"
          :expanded="expanded"
          :menuItem="child"
          @click="subItemAction(child)"
        />
      </side-menu-item>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "~/components/layout/buttons/PrimaryButton.vue";
import { LoadingState } from "~/types";
import instanceHandler from "~/core/instanceHandler";
import SideMenuSubItem from "./SideMenuSubItem.vue";
import auth from "~/core/auth";
import SideMenuItem from "./SideMenuItem.vue";

export default {
  components: { PrimaryButton, SideMenuSubItem, SideMenuItem },
  methods: {
    expand(handle) {
      this.expanded = [handle];
    },
    expandAdd(handle) {
      this.expanded = [...this.expanded, handle];
    },
    collapse(handle) {
      this.expanded = this.expanded.filter((a) => a != handle);
    },
    subItemAction(menuItem) {
      this.$store.commit("nav/closeAllDrawers");
      this.$store.commit("search/reset");

      if (menuItem.href) this.$router.push(menuItem.href);
      else this.$router.push(this.localePath("/c/" + menuItem.handle));
    },
  },
  async created() {
    try {
      const { attributes } = await auth().currentAuthenticatedUser();

      this.firstName = attributes.given_name;
      this.isAuthenticated = true;
    } catch (e) {}
    this.authReady = true;
  },
  data() {
    return {
      menuItems: [],
      expanded: [],
      isAuthenticated: false,
      firstName: "",
      authReady: false,
    };
  },
  async fetch() {
    let productCategories = [];
    this.$store.commit("loadingState/setLoadingState", LoadingState.loading);

    const { loadingState, data } = await instanceHandler({
      path: "getCategories",
      args: { root: true },
      cache: true,
    });

    if (loadingState == LoadingState.ready) {
      productCategories = data?.categories || [];
    }

    let menuItems = [
      {
        href: this.localePath("/b"),
        title: this.$t("brands"),
      },
      ...productCategories.map((a) => ({
        ...a,
        href: this.localePath("/c/" + a.handle),
      })),
      {
        handle: "sale",
        title: this.$t("saleCollection"),
        href: this.localePath("/c/sale"),
        style: "sale",
      },
    ];

    if (
      this.$route.params.brandHandle ||
      this.$route.params.seriesHandle ||
      this.$route.params.productHandle
    ) {
      const { data } = await instanceHandler({
        path: "getSeriesForBrand",
        args: {
          handle: this.$route.params.brandHandle,
          seriesHandle: this.$route.params.seriesHandle,
          productHandle: this.$route.params.productHandle,
        },
        cache: true,
      });

      if (data?.series?.length) {
        const series = data.series;

        const brandMenu = {
          handle: series[0].brand.handle,
          title: this.$t("allSeries"),
          hideShowAll: true,
          href: this.localePath("/b/" + series[0].brand.handle),
          children: series.map((a) => ({
            handle: a.handle,
            title: a.name,
            href: this.localePath("/s/" + a.handle),
          })),
        };

        menuItems.unshift(brandMenu);
        this.$store.commit("loadingState/setLoadingState", LoadingState.ready);
      }
    } else {
      this.$store.commit("loadingState/setLoadingState", LoadingState.ready);
    }

    this.menuItems = menuItems.map((menuItem) => {
      if (menuItem.children?.length)
        menuItem.children.sort((a, b) =>
          (a.title || a.name).localeCompare(b.title || b.name)
        );

      return menuItem;
    });
  },
};
</script>

<style scoped>
.a-greeting {
  letter-spacing: 0.1em;
  color: var(--c-gray-2);
}
.a-items {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
