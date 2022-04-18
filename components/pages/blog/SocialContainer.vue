<template>
  <div>
  <h4>{{ $t('stayUpToDate')}}</h4>
    <div class="a-socialiconlist">
      <a class="a-socialicon" href="https://www.instagram.com/hedo.beauty/" target="_blank">
        <instagram-icon height=24 />
        <span>hedo.beauty</span>
      </a>
      <a class="a-socialicon" href="https://www.facebook.com/hedo.parfuemerie/" target="_blank">
        <facebook-icon height=24 />
        <span>Hedo Parfümerie</span>
      </a>
    </div>
  </div>
</template>

<script>
import InstagramIcon from '~/components/icons/social/InstagramIcon.vue'
import FacebookIcon from '~/components/icons/social/FacebookIcon.vue'

export default {
  components: { FacebookIcon, InstagramIcon },
}
</script>

<style scoped>
.a-socialicon{
  display: flex;
  align-items: center;
  gap: var(--gap);
}

.a-socialiconlist{
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

</style>