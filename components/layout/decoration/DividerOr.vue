<template>
  <div class="a-divider">
    <span class="a-divider-caption">{{ $t("or") }}</span>
  </div>
</template>

<style scoped>
.a-divider {
  position: relative;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: calc(var(--default-margin) * 3);
  margin-top: calc(var(--default-margin) * 3);
  border-bottom: 1px solid var(--c-gray-3);
}
.a-divider-caption {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  top: -10px;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  color: var(--c-gray-3);
  background-color: white;
  padding: 0 var(--padding);
}
</style>
