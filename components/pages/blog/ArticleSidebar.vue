<template>
  <div>
    <div class="mb4" v-if="similarArticles.length">
      <h4 class="mb2">{{ $t('youMightAlsoBeInterestedIn') }}</h4>
      <article-list :articleSearchResults="similarArticles" />
    </div>
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
  </div>
</template>


<script>
import ArticleList from './ArticleList.vue'
import InstagramIcon from '~/components/icons/social/InstagramIcon.vue'
import FacebookIcon from '~/components/icons/social/FacebookIcon.vue'

export default {
  components: { ArticleList, FacebookIcon, InstagramIcon },
  props: [ "similarArticles" ],
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