<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <input v-if="story.editing" v-model="story.plot" class="form-control" />
      <span v-else>{{ story.plot }}</span>
    </td>
    <td>
      <input v-if="story.editing" v-model="story.writer" class="form-control" />
      <span v-else>{{ story.writer }}</span>
    </td>
    <td>{{ story.upvotes }}</td>
    <td>
      <div v-if="!story.editing" class="btn-group">
        <button type="button" @click="upvoteStory(story)" class="btn btn-primary">Проголосовать</button>
        <button type="button" @click="editStory(story)" class="btn btn-dark">Редактировать</button>
        <button type="button" @click="deleteStory(story)" class="btn btn-danger">Удалить</button>
      </div>
      <div class="btn-group" v-else>
        <button
          type="button"
          v-if="story.uuid"
          class="btn btn-primary"
          @click="updateStory(story)"
        >Обновить историю</button>
        <button
          type="button"
          v-else
          class="btn btn-success"
          @click="storeStory(story)"
        >Сохранить историю</button>
        <button type="button" @click="story.editing=false" class="btn btn-light">Отмена</button>
      </div>
    </td>
  </tr>
</template>

<script>
import axios from 'axios';

const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

export default {
  name: 'Story',
  props: {
    story: Object,
    index: Number,
  },
  methods: {
    upvoteStory(story) {
      // eslint-disable-next-line
      story.upvotes++;
      axios({
        method: 'patch',
        url: `/api/stories/${story.uuid}/`,
        data: story,
        headers: {
          'X-CSRFTOKEN': csrfToken,
        },
      });
    },

    updateStory(story) {
      axios.patch(`/api/stories/${story.uuid}/`, story, { headers: { 'X-CSRFTOKEN': csrfToken } });
      // Установить false свойство editing, чтобы показывать снова кнопки действий и
      // скрывать поля ввода
      story.editing = false;
    },

    deleteStory(story) {
      // ищем нужную историю
      const index = this.$parent.stories.indexOf(story);
      this.$parent.stories.splice(index, 1);
      axios.delete(`/api/stories/${story.uuid}/`, { headers: { 'X-CSRFTOKEN': csrfToken } });
    },

    storeStory(story) {
      axios.post('/api/stories/', story, { headers: { 'X-CSRFTOKEN': csrfToken } }).then((response) => {
        story.editing = false;
        story.uuid = response.data.uuid;
      });
    },

    editStory(story) {
      story.editing = true;
    },
  },
};
</script>
