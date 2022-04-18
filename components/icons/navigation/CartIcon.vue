<template>
  <!-- <svg :width="height + 'px'" :height="height + 'px'" focusable="false" :fill="color" viewBox="0 0 24 24" role="img" aria-hidden="false"><title id="warenkorb-8209801">Warenkorb</title><path d="M21.193 8.712a2.984 2.984 0 0 0-2.986-2.726h-.952v-.751a5.255 5.255 0 0 0-10.51 0v.75h-.951a2.983 2.983 0 0 0-2.986 2.727L1.715 20.73A2.999 2.999 0 0 0 4.7 24h.005l14.599-.027a2.998 2.998 0 0 0 2.98-3.27L21.193 8.712zM8.246 5.235a3.754 3.754 0 0 1 7.508 0v.75H8.246v-.75zm11.056 17.238-14.599.025h-.002a1.496 1.496 0 0 1-1.49-1.631l1.093-12.02a1.488 1.488 0 0 1 1.49-1.36h.95V9.74a.75.75 0 0 0 1.502 0V7.487h7.508V9.74c0 .415.336.75.75.75h.002a.75.75 0 0 0 .75-.75V7.487h.951a1.49 1.49 0 0 1 1.49 1.361l1.092 11.993a1.496 1.496 0 0 1-1.488 1.632z"></path></svg> -->
  <svg :width="height + 'px'" :height="height + 'px'" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M30.5747 34.5L5.42533 34.5C3.3799 34.5 1.77034 32.7535 1.93696 30.7149L3.36965 13.1855C3.5181 11.3691 5.03557 9.97059 6.85802 9.97059H18L29.142 9.97059C30.9644 9.97059 32.4819 11.3691 32.6304 13.1855L34.063 30.7149C34.2297 32.7535 32.6201 34.5 30.5747 34.5Z" :stroke="color" stroke-width="2"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4994 7.41176C22.4602 4.27343 20.3257 2 17.5 2C14.6743 2 12.5398 4.27343 12.5006 7.41176H10.5004C10.5412 3.35776 13.3877 0 17.5 0C21.6123 0 24.4588 3.35776 24.4996 7.41176H22.4994Z" :fill="color"/>
  <path d="M11.5 12.1765V7.41176" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23.5 12.1765V7.41176" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

</template>

<script>
export default {
  props: ["color", "height"],
  
}
</script>
