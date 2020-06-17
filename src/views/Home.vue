<template>
  <div class="home">
    <ModalCreate />
    <ModalEdit />
    <Loader v-if="loading" />
    <div v-else class="row">
      <div class="col l3 m1"></div>
      <div class="col s12 l6 m10">
        <div class="center-align">
          <h5 v-if="bots.length">Боты:</h5>
          <div v-else>
            <p>У вас еще нет ботов</p>
            <button @click="addBot" class="btn waves-effect blue">
              Добавить бота
            </button>
          </div>
        </div>
        <ul v-if="bots.length" class="collection">
          <li
            v-for="bot in bots"
            :key="bot.id"
            class="collection-item bot-item"
            @click="editBot(bot)"
          >
            <div>
              {{ bot.title }}
              <a href="#!" class="secondary-content"
                ><i
                  class="material-icons blue-text"
                  @click.stop="deleteBot(bot.id)"
                  >delete</i
                >
              </a>
            </div>
          </li>
        </ul>
        <button
          v-if="bots.length"
          @click="addBot"
          class="btn waves-effect blue"
        >
          Добавить бота
        </button>
      </div>
      <div class="col l3 m1"></div>
    </div>
  </div>
</template>

<script>
import { eventEmitter } from "@/main";
import Loader from "../components/app/Loader";
import ModalCreate from "@/components/app/ModalCreate.vue";
import ModalEdit from "../components/app/ModalEdit";
export default {
  name: "Home",
  data: () => ({
    bots: [],
    loading: true
  }),
  methods: {
    addBot() {
      eventEmitter.$emit("showCreateModal");
    },
    editBot(bot) {
      eventEmitter.$emit("showEditModal", bot);
    },
    async deleteBot(id) {
      await this.$store.dispatch("deleteBot", id);
      await this.updateData();
    },
    async updateData() {
      this.loading = true;
      this.bots = await this.$store.dispatch("fetchBots");
      this.loading = false;
    }
  },
  async created() {
    eventEmitter.$on("refreshBots", async () => {
      await this.updateData();
    });
  },
  async mounted() {
    await this.updateData();
  },
  components: {
    Loader,
    ModalEdit,
    ModalCreate
  }
};
</script>
