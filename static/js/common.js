let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

Vue.component('story', {
  template: "#template-story-raw",
  props: ['story', 'index'],
  methods: {
    upvoteStory: function (story) {
      story.upvotes++;
      story['csrfToken'] = csrfToken;
      axios({
        method: 'patch',
        url:`/api/stories/${story.uuid}/`, 
        data: story
      }).catch(function(e) {
        console.log(e)
      });
    },

    deleteStory: function (story) {
      // ищем нужную историю
      let index = vm.stories.indexOf(story);

      // удаляем её
      vm.stories.splice(index, 1)
      }
  },
  delimiters: ['${', '}'],
});

let app = new Vue({
    el: '#app',
    data: {
      stories: []
    },
    mounted: function () {
      let vm = this;
      axios.get('api/stories')
        .then(function (response) {
          Vue.set(vm, 'stories', response.data)
          // Или как мы делали раньше
          // vm.stories = response.data
        })
    },
    delimiters: ['${', '}'],
})



