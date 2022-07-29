<template>
  <div class="a-orderinfo panel pointer" @click="$emit('click')">
    <div class="flex-h-c">
      <cancelled-icon
        v-if="statusCancelled"
        height="20"
        color="var(--c-gray-2)"
      />
      <pending-icon v-if="statusOpen" height="20" color="var(--c-gray-2)" />
      <paid-icon v-if="statusPaid" height="20" color="var(--c-gray-2)" />
      <success-icon v-if="statusClosed" height="20" color="var(--c-gray-2)" />
      <div :class="statusCancelled ? 'subdued' : ''">
        <div>{{ itemCountCaption }}</div>
        <div class="b">{{ total }}</div>
      </div>
    </div>
    <span class="subdued">{{ orderDate }}</span>
  </div>
</template>

<script>
import { toMoney } from "~/util/money";
import PaidIcon from "~/components/icons/status/PaidIcon.vue";
import PendingIcon from "~/components/icons/status/PendingIcon.vue";
import CancelledIcon from "~/components/icons/status/CancelledIcon.vue";
import SuccessIcon from "~/components/icons/status/SuccessIcon.vue";

export default {
  components: { CancelledIcon, PaidIcon, PendingIcon, SuccessIcon },
  props: ["order"],
  computed: {
    statusPaid() {
      return this.order.status == "paid";
    },
    statusClosed() {
      return this.order.status == "closed";
    },
    statusOpen() {
      return this.order.status == "open";
    },
    statusCancelled() {
      return this.order.status == "cancelled";
    },
    itemCountCaption() {
      const items = this.order.lineItems.length;
      if (items == 1) return `1 ${this.$t("item")}`;
      else return `${items} ${this.$t("items")}`;
    },
    total() {
      return toMoney(
        Math.round((this.order.shippingCost + this.order.subTotal) * 100) / 100,
        this
      );
    },
    orderDate() {
      const options = { month: "numeric", day: "numeric", year: "numeric" };

      return new Date(this.order._created).toLocaleDateString(
        this.$i18n.localeProperties.numberFormat,
        options
      );
    },
  },
};
</script>

<style scoped>
.a-orderinfo {
  display: flex;
  justify-content: space-between;
}
</style>
