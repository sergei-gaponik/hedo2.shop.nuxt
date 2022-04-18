<template>
  <form @submit.prevent="submit()" class="a-overflow">
    <input type="submit" ref="formSubmit" style="display:none">
    <div :class="noContainer ? '' : 'container-m'">
      <h2 v-if="!hideTitle">{{ this.title || (editMode ? $t('editAddress') : $t('addAddress')) }}</h2>
      <div class="grid-2-s">
        <text-input 
          :caption="$t('firstName')"
          :placeholder="$t('firstName')"
          :required="true"
          v-model="address.firstName"
          autocomplete="given-name"
        />
        <text-input 
          :caption="$t('lastName')"
          :placeholder="$t('lastName')"
          :required="true"
          v-model="address.lastName"
          autocomplete="family-name"
        />
      </div>
      <div>
        <text-input
          ref="addressLine"
          :caption="$t('addressLine')"
          :placeholder="$t('addressLine')"
          :required="true"
          v-model="address.addressLine"
          autocomplete="street-address"
        />
        <text-input
          :caption="$t('addressLine') + ' 2'"
          :placeholder="$t('addressLine') + ' 2'"
          v-model="address.addressLine2"
        />
      </div>
      <div>
        <div class="grid-2-s">
          <text-input
            :caption="$t('zipCode')"
            :placeholder="$t('zipCode')"
            required
            v-model="address.zipCode"
            autocomplete="postal-code"
          />
          <text-input
            :caption="$t('city')"
            :placeholder="$t('city')"
            required
            v-model="address.city"
            autocomplete="locality"
          />
        </div>
        <select-box 
          :options="countryOptions"
          :caption="$t('country')"
          :required="true"
          v-model="address.country"
        />
      </div>
      <div class="mt2" v-if="!billingAddress">
        <div v-if="!showDeliveryInstructions" class="flex-h-c pointer" @click="() => showDeliveryInstructions = true">
          <add-icon height=20 color="var(--c-gray-3)" />
          <span>{{ $t('deliveryInstruction') }}</span>
        </div>
        <multi-line 
          v-else
          :caption="$t('deliveryInstruction')" 
          v-model="address.deliveryInstruction"
        />
      </div>
      <div v-if="!guestCheckout" class="mt4">
        <check-box v-model="address.defaultShippingAddress" center>{{ $t('defaultShippingAddress') }}</check-box>
        <check-box v-model="address.defaultBillingAddress" center>{{  $t('defaultBillingAddress') }}</check-box>
      </div>
      <div class="a-buttons mt4" v-show="!hideSubmit">
        <primary-button submit>{{ submitCaption }}</primary-button>
        <icon-button v-if="editMode && !guestCheckout" @click="deleteAddress()">
          <delete-icon height=36 color="var(--c-gray-1)"/>
        </icon-button>
      </div>
    </div>
  </form>
</template>

<script>
import TextInput from '~/components/layout/inputs/TextInput.vue'
import SelectBox from '~/components/layout/inputs/SelectBox.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'
import CheckBox from '~/components/layout/inputs/CheckBox.vue'
import { getIdToken } from '~/util/auth'
import MultiLine from '~/components/layout/inputs/MultiLine.vue'
import instanceHandler from '~/core/instanceHandler'
import DeleteIcon from '~/components/icons/basic/DeleteIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'
import crc from '~/util/crc'
import AddIcon from '~/components/icons/basic/AddIcon.vue'

export default {
  components: { AddIcon, TextInput, SelectBox, PrimaryButton, SecondaryButton, CheckBox, MultiLine, IconButton, DeleteIcon },
  props: {
    initAddress: Object,
    initFromStore: Boolean,
    guestCheckout: Boolean,
    billingAddress: Boolean,
    title: String,
    hideTitle: Boolean,
    noContainer: Boolean,
    hideSubmit: Boolean,
    autoComplete: Boolean
  },
  computed: {
    editMode(){
      return this.initAddress != null
    },
    submitCaption(){
      if(this.editMode)
        return this.$t('save')
      else
        return this.$t('add')
    }
  },
  mounted(){

    if(!this.autoComplete || !process.client)
      return;

    const textInput = this.$refs.addressLine.$refs.input
    
    try{

      const autocomplete = new google.maps.places.Autocomplete(textInput, {
        types: ["address"],
        fields: ["address_components"]
      })
  
  
      autocomplete.setComponentRestrictions({
        country: this.countryOptions.map(a => a[0].toLowerCase())
      })
  
      google.maps.event.addListener(autocomplete, "place_changed", () => {
  
        const addressComponents = autocomplete.getPlace()?.address_components
  
        if(!addressComponents) return;
  
        const components = Object.fromEntries(addressComponents
          .flatMap(component => component.types.map(type => [type, component.short_name])
        ))
  
        this.address.addressLine = `${components.route} ${components.street_number || ""}`
        this.address.zipCode = components.postal_code
        this.address.city = components.locality
        this.address.country = components.country
  
        google.maps.event.clearInstanceListeners(autocomplete)
      })
    }
    catch(e){
      console.error(e)
    }


  },
  data(){


    const countryOptions = [
      ["DE", "Deutschland"],
      ["AT", "Österreich"]
    ]

    let address;

    let deref = obj => obj ? JSON.parse(JSON.stringify(obj)) : null

    if(this.initAddress)
      address = deref(this.initAddress)
    else if(this.initFromStore && !this.billingAddress)
      address = deref(this.$store.state.checkout.shippingInfo.shippingAddress)
    else if(this.initFromStore && this.billingAddress)
      address = deref(this.$store.state.checkout.shippingInfo.billingAddress)
    
    if(!address){
      address = {
        hash: null,
        firstName: "",
        lastName: "",
        addressLine: "",
        addressLine2: "",
        zipCode: "",
        city: "",
        country: "DE",
        defaultShippingAddress: !this.guestCheckout,
        deliveryInstruction: "",
        defaultBillingAddress: !this.guestCheckout
      }
    }

    return {
      showDeliveryInstructions: false,
      countryOptions,
      dhlCustomerNumber: "",
      dhlPackstationNumber: "",
      address
    }
  },
  methods: {
    async submit(){

      this.address.hash = this.address.hash || crc(this.address).toString() + Date.now()

      if(this.guestCheckout){
        this.$emit('submit', this.address)
        return;
      }

      const idToken = await getIdToken()

      const r = await instanceHandler({
        path: this.editMode ? "updateUserAddress" : "createUserAddress",
        args: {
          idToken,
          address: this.address
        }
      })

      if(!r.errors?.length){
        this.$emit("close")
        this.$emit('submit', this.address)
      }
    },
    async deleteAddress(){

      const confirmation = await this.$store.dispatch("confirmDialog/ask", this.$t('confirmAddressDelete'))

      const idToken = await getIdToken()

      if(confirmation){
        const r = await instanceHandler({
          path: 'deleteUserAddress',
          args: {
            idToken,
            hash: this.address.hash
          }
        })
        if(!r.errors?.length){
          this.$emit("close")
        }
      }
    }
  }
}
</script>

<style scoped>
.a-overflow {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
.a-buttons{
  display: flex;
  gap: var(--gap);
}
</style>