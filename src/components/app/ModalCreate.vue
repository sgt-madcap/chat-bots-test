<template>
  <div ref="modal" id="modal1" class="modal">
    <div class="modal-content">
      <h4>Создание бота</h4>
      <form @submit.prevent="submitHandler">
        <div class="row flex">
          <div class="col s6">
            <div class="input-field">
              <input
                id="title"
                type="text"
                v-model="title"
                :class="{
                  invalid: $v.title.$dirty && !$v.title.required
                }"
              />
              <label for="title">Название</label>
            </div>
            <div class="input-field">
              <textarea
                id="description"
                class="materialize-textarea"
                v-model="description"
                :class="{
                  invalid: $v.description.$dirty && !$v.description.required
                }"
              ></textarea>
              <label for="description">Описание</label>
              <small
                class="red-text"
                v-if="$v.description.$dirty && !$v.description.required"
              >
                Введите описание
              </small>
            </div>
            <datepicker
              input-class="datepicker-input"
              v-model="date"
            ></datepicker>
          </div>
          <div
            class="col s6 draggable"
            @drop="onDrop"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover.prevent
            :class="{ dragging: isDragging }"
          >
            <img v-if="image" class="botImage" :src="image" alt="image" />
          </div>
        </div>
        <button class="btn waves-effect blue" type="submit">Создать</button>
      </form>
    </div>
  </div>
</template>

<script>
import { eventEmitter } from "@/main";
import Datepicker from "vuejs-datepicker";
import Modal from "@/mixins/modal.mixin.js";
import { required } from "vuelidate/lib/validators";

export default {
  name: "modal-create",
  mixins: [Modal],
  validations: {
    title: { required },
    description: { required }
  },
  created() {
    // eslint-disable-next-line no-undef
    eventEmitter.$on("showCreateModal", () => {
      this.modal.open();
    });
  },
  methods: {
    onDragEnter(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      this.isDragging = false;

      const file = e.dataTransfer.files[0];

      if (!file.type.match("image.*")) {
        this.$message("Файл не является картинкой");
      } else {
        const reader = new FileReader();
        reader.onload = e => (this.image = e.target.result);
        reader.readAsDataURL(file);
      }
    },
    onDragLeave(e) {
      e.preventDefault();
      this.isDragging = false;
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const bot = {
        title: this.title,
        description: this.description,
        image: this.image,
        date: this.date.toString()
      };
      try {
        let uid = await this.$store.dispatch("getUid");
        await this.$store.dispatch("createBot", { uid: uid, bot: bot });
        this.modal.close();
        this.$message("Бот успешно создан");
        eventEmitter.$emit("refreshBots");
      } catch (e) {
        console.log(e);
      }
    }
  },
  components: {
    Datepicker
  }
};
</script>
