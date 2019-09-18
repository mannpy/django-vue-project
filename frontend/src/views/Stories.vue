<template>
  <div class="stories">
    <div class="container">
      <div class="row">
        <div class="col">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a
                @click.prevent="fetchStories(pagination.prev_page_url)"
                class="page-link btn-link"
                href
                :class="{ disabled: !pagination.prev_page_url }"
              >Предыдущая страница</a>
            </li>
            <li
              class="page-item"
              v-for="page in pagination.page_range"
              :key="page"
              :class="{ active: page === pagination.current_page }"
            >
              <a
                class="page-link"
                @click.prevent="fetchStories('/api/stories/?page=' + page)"
                href
              >{{ page }}</a>
            </li>
            <li class="page-item">
              <a
                @click.prevent="fetchStories(pagination.next_page_url)"
                class="page-link btn-link"
                href
                :class="{ disabled: !pagination.next_page_url }"
              >Следующая страница</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <p class="lead">Вот список всех ваших историй.</p>
          <table class="table table-striped">
            <tr>
              <th>#</th>
              <th>Сюжет</th>
              <th>Автор</th>
              <th>Кол-во голосов</th>
              <th>Действия</th>
            </tr>
            <tr
              v-for="(story, index) in stories"
              :key="index"
              is="story"
              :story="story"
              :index="index"
            ></tr>
          </table>

          <p class="lead">
            <button
              type="button"
              @click="createStory()"
              class="btn btn-primary"
            >Добавить новую историю?</button>
          </p>
          <pre>{{ $data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
import Story from '@/components/Story.vue';

export default {
  name: 'stories',
  components: {
    Story,
  },
  data() {
    return {
      stories: [],
      pagination: {},
    };
  },
  methods: {
    fetchStories(pageUrl) {
      const vm = this;
      pageUrl = pageUrl || 'api/stories';
      axios.get(pageUrl).then((response) => {
        const storiesReady = response.data.results.map((story) => {
          story.editing = false;
          return story;
        });
        vm.makePagination(response.data);
        vm.stories = storiesReady;

        // Или как мы делали раньше
        // vm.stories = response.data
      });
    },
    makePagination(data) {
      const pagination = {
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        page_range: data.page_range,
      };

      this.pagination = pagination;
    },
    createStory() {
      const newStory = {
        plot: '',
        upvotes: 0,
        editing: true,
      };
      this.stories.push(newStory);
    },
  },
  mounted() {
    this.fetchStories();
  },
};
</script>
