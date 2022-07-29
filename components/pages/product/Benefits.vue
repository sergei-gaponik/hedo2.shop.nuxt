<template>
  <div class="panel a-panel">
    <div class="a-benefits">
      <div>
        <shipping-icon height="20" color="var(--c-blue-1)" />
        <span>{{ $t("benefitsFreeShipping") }}</span>
      </div>
      <div>
        <water-drop-icon height="20" color="var(--c-blue-1)" />
        <span>{{ $t("benefitsFreeSamples") }}</span>
      </div>
      <div>
        <heart-icon height="20" color="var(--c-blue-1)" />
        <a
          class="a-link"
          href="https://www.trustpilot.com/review/hedo-beauty.shop"
          target="_blank"
        >
          {{ $t("benefitsCustomerTrust") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ShippingIcon from "~/components/icons/benefits/ShippingIcon.vue";
import HeartIcon from "~/components/icons/benefits/HeartIcon.vue";
import WaterDropIcon from "~/components/icons/benefits/WaterDropIcon.vue";

export default {
  components: { ShippingIcon, HeartIcon, WaterDropIcon },
};
</script>

<style scoped>
.a-panel {
  background-color: var(--c-blue-2-l);
}

.a-benefits {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.a-benefits > div {
  display: flex;
  gap: var(--gap);
  align-items: center;
  color: var(--c-blue-1);
}

.a-link {
  color: var(--c-blue-1);
  text-decoration: underline;
}
</style>
