let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

Vue.component('story', {
  template: "#template-story-raw",
  props: ['story', 'index'],
  methods: {
    upvoteStory: function (story) {
      story.upvotes++;
      axios({
        method: 'patch',
        url:`/api/stories/${story.uuid}/`, 
        data: story,
        csrfToken: csrfToken
      }).catch(function(e) {
        console.log(e)
      });
    },

    updateStory: function (story) {
      axios.patch(`/api/stories/${story.uuid}/`, story)
      // Установить false свойство editing, чтобы показывать снова кнопки действий и
      //скрывать поля ввода
      story.editing = false;
    },

    deleteStory: function (story) {
      // ищем нужную историю
      let index = this.$parent.stories.indexOf(story);
      this.$parent.stories.splice(index, 1);
      axios.delete('/api/stories/' + story.uuid);
    },

    storeStory: function (story) {
      vm = this.$parent;
      axios.post('/api/stories/', story).then(function (response) {
      story.editing = false;
      Vue.set(story, 'uuid', response.data.results.uuid);
      });
    },

    editStory: function (story) {
      story.editing = true;
    },

  },
  delimiters: ['${', '}'],
});

let app = new Vue({
    el: '#app',
    data: {
      stories: [],
      pagination: {}
    },
    methods: {
      fetchStories: function(page_url) {
        let vm = this;
        page_url = page_url || 'api/stories';
        axios.get(page_url)
        .then(function (response) {
          let storiesReady = response.data.results.map(function (story) {
            story.editing = false;
            return story
          });
          vm.makePagination(response.data);
          Vue.set(vm, 'stories', storiesReady);
          
          // Или как мы делали раньше
          // vm.stories = response.data
        });
      },
      makePagination: function(data) {
        let pagination = {
          current_page: data.current_page,
          last_page: data.last_page,
          next_page_url: data.next_page_url,
          prev_page_url: data.prev_page_url,
          page_range: data.page_range
        };

        Vue.set(this, 'pagination', pagination);

      },
      createStory: function () {
        var newStory = {
          plot: '',
          upvotes: 0,
          editing: true
        };
        this.stories.push(newStory);
        },
    },
    mounted: function () {
      this.fetchStories();
    },
    delimiters: ['${', '}'],
})



