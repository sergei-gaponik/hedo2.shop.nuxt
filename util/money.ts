
export function toMoney(amount, _this){

  return amount.toLocaleString(_this.$i18n.localeProperties.numberFormat, { 
    style:'currency', 
    currency: _this.$i18n.localeProperties.currency 
  })
}