<template>
  <div class="a-footer">
    <div class="a-green">
      <div :class="$device.isMobile ? 'container-m' : 'container'">
        <div :class="gridClass">
          <div>
            <ul class="a-legal">
              <li><nuxt-link :to="localePath('/page/impressum')">{{ $t('companyDetails') }}</nuxt-link></li>
              <li><nuxt-link :to="localePath('/page/legal')">{{ $t('termsOfService') }}</nuxt-link></li>
              <li><nuxt-link :to="localePath('/page/shipping')">{{ $t('paymentAndShipping') }}</nuxt-link></li>
              <li><nuxt-link :to="localePath('/page/cancellation-policy')">{{ $t('cancellationPolicy')}}</nuxt-link></li>
              <li><nuxt-link :to="localePath('/page/privacy')">{{ $t('privacyPolicy') }}</nuxt-link></li>
            </ul>
          </div>
          <div>
            <h4>{{ $t('contact') }}</h4>
            <p>
              kontakt@hedo-beauty.de<br>
              Tel.: 03574 121759
            </p>
            <p>
              HEDO Parfümerie &amp; Kosmetik<br>
              Dietrich-Heßmer-Platz 31<br>
              01979 Lauchhammer
            </p>
          </div>
          
          <social-container />
        </div>
        <div class="mt4">
          <h4>{{ $t('payConvenientlyWith') }}</h4>
          <payment-method-icons singleLine />
        </div>
      </div>
    </div>
    <slogan :class="$device.isMobile ? 'a-padding-m' : ''" /> 
  </div>
</template>

<script>
import SocialContainer from '~/components/pages/blog/SocialContainer.vue'
import PaymentMethodIcons from '~/components/pages/product/PaymentMethodIcons.vue'
import Slogan from '~/components/pages/home/Slogan.vue'
import Logo from '~/components/icons/Logo.vue'

export default {
  components: { SocialContainer, PaymentMethodIcons, Slogan, Logo },
  computed: {
    gridClass(){
      if(this.$device.isMobile)
        return 'a-grid a-grid-m'
      else if(this.$device.isTablet)
        return 'a-grid a-grid-t'
      else
        return 'a-grid a-grid-d' 
    }
  }
}
</script>

<style scoped>
.a-footer{
  position: relative;
  bottom: 0;
  width: 100vw;
}

.a-green{
  background-color: var(--c-green-3-l);
  padding-bottom: var(--margin-4);
}
.a-padding-m{
  padding-bottom: calc(var(--footer-y-m) + var(--button-y) + var(--gap) * 2);
} 
.a-grid{
  display: grid;
  gap: var(--gap);
}

.a-grid-d{
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.a-grid-t{
  grid-template-columns: 1fr 1fr 1fr;
}

.a-grid-m{
  grid-template-columns: 1fr 1fr;
}

.a-legal{
  line-height: 2rem;
}
</style>