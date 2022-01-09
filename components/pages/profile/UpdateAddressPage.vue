<template>
  <form @submit.prevent="submit()" class="a-overflow">
    <div class="container-m">
      <h2>{{ this.title || (editMode ? $t('editAddress') : $t('addAddress')) }}</h2>
      <div class="mb2" v-if="!editMode">
        <radio-button value="homeAddress" v-model="addressType" center>{{ $t('homeAddress') }}</radio-button>
        <radio-button value="packstation" v-model="addressType" center>{{ $t('dhlPackstation') }}</radio-button>
      </div>
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
      <div v-if="addressType == 'homeAddress'">
        <text-input
          :caption="$t('addressLine')"
          :placeholder="$t('addressLine')"
          :required="addressType == 'homeAddress'"
          v-model="address.addressLine"
          autocomplete="street-address"
        />
        <text-input
          :caption="$t('addressLine') + ' 2'"
          :placeholder="$t('addressLine') + ' 2'"
          v-model="address.addressLine2"
        />
      </div>
      <div v-else>
        <text-input
          :caption="$t('dhlCustomerNumber')"
          :placeholder="$t('dhlCustomerNumber')"
          :required="addressType == 'packstation'"
          v-model="dhlCustomerNumber"
        />
        <text-input
          :caption="$t('dhlPackstationNumber')"
          :placeholder="$t('dhlPackstationNumber')"
          :required="addressType == 'packstation'"
          v-model="dhlPackstationNumber"
        />
      </div>
      <div class="mb4">
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
      <div class="mb4" v-if="addressType == 'homeAddress'">
        <multi-line 
          :caption="$t('deliveryInstruction')" 
          v-model="address.deliveryInstruction"
        />
      </div>
      <div class="mb4" v-if="!guestCheckout">
        <check-box v-model="address.defaultShippingAddress" center>{{ $t('defaultShippingAddress') }}</check-box>
        <check-box v-model="address.defaultBillingAddress" center>{{  $t('defaultBillingAddress') }}</check-box>
      </div>
      <div class="a-buttons">
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
import RadioButton from '~/components/layout/inputs/RadioButton.vue'
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

export default {
  components: { TextInput, RadioButton, SelectBox, PrimaryButton, SecondaryButton, CheckBox, MultiLine, IconButton, DeleteIcon },
  props: {
    initAddress: Object,
    guestCheckout: Boolean,
    title: String
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
  data(){

    const countryOptions = [
      ["DE", "Deutschland"],
      ["AT", "Österreich"]
    ]

    return {
      countryOptions,
      addressType: "homeAddress",
      dhlCustomerNumber: "",
      dhlPackstationNumber: "",
      address: this.initAddress ? JSON.parse(JSON.stringify(this.initAddress)) : {
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
  },
  methods: {
    async submit(){

      if(this.addressType == 'packstation'){
        this.address.addressLine = `Packstation ${this.dhlPackstationNumber}`
        this.address.addressLine2 = this.dhlCustomerNumber
      }

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