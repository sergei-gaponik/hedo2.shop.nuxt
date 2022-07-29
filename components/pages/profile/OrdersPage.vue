<template>
  <div>
    <portal to="body2">
      <drawer-bottom-m
        v-if="$device.isMobile"
        :show="selectedOrder"
        @close="closeDetails"
      >
        <order-details :order="selectedOrder" />
      </drawer-bottom-m>
      <pop-up
        v-if="!$device.isMobile"
        :show="!!selectedOrder"
        @close="closeDetails"
        width="var(--popup-max-x)"
        height="var(--popup-max-y)"
      >
        <order-details :order="selectedOrder" />
      </pop-up>
    </portal>
    <div>
      <div v-if="!orders.length">
        {{ $t("noOrders") }}
      </div>
      <div v-else class="flex-v">
        <order-info
          v-for="order in shownOrders"
          :key="order._id"
          :order="order"
          @click="select(order._id)"
        />
      </div>
      <div v-if="orders.length > 3" class="mt2">
        <show-more v-model="showMoreOrders" :showMoreCaption="$t('showAll')" />
      </div>
    </div>
  </div>
</template>

<script>
import { getIdToken } from "~/util/auth";
import { LoadingState } from "~/types";
import instanceHandler from "~/core/instanceHandler";
import OrderInfo from "./OrderInfo.vue";
import ShowMore from "~/components/layout/common/ShowMore.vue";
import OrderDetails from "./OrderDetails.vue";
import PopUp from "~/components/layout/misc/PopUp.vue";
import DrawerBottomM from "~/components/layout/drawer/DrawerBottomM.vue";

export default {
  components: { OrderInfo, ShowMore, OrderDetails, DrawerBottomM, PopUp },
  computed: {
    selectedOrder() {
      if (this.orders.length && this.selectedOrderId != null)
        return this.orders.find((a) => a._id == this.selectedOrderId);
      else return null;
    },
    sortedOrders() {
      return this.orders.sort((a, b) => b._created - a._created);
    },
    shownOrders() {
      if (this.showMoreOrders) return this.sortedOrders;
      else return this.sortedOrders.slice(0, 3);
    },
  },
  methods: {
    closeDetails() {
      this.selectedOrderId = null;
    },
    select(id) {
      this.selectedOrderId = id;
    },
  },
  async fetch() {
    this.$store.commit("loadingState/isLoading");

    const idToken = await getIdToken();

    const r = await instanceHandler({
      path: "getUserOrders",
      args: { idToken },
      cache: true,
    });

    this.orders = r.data?.orders || [];

    if (r.errors?.length) {
      this.$store.dispatch(
        "notifications/error",
        this.$t("ordersCouldNotBeLoaded")
      );
    }

    this.$store.commit("loadingState/isReady");
  },
  data() {
    return {
      orders: [],
      showMoreOrders: false,
      selectedOrderId: null,
    };
  },
};
</script>

<style scoped></style>
