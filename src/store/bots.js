import firebase from "firebase/app";

export default {
  actions: {
    async createBot({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(`/users/${payload.uid}/bots`)
          .push(payload.bot);
      } catch (e) {
        commit("setError", e);
      }
    },
    async deleteBot({ dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/bots/`)
          .child(id)
          .remove();
      } catch (e) {
        console.log(e);
      }
    },
    async updateBot({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref(`/users/${payload.uid}/bots/`)
          .child(`${payload.bot.id}`)
          .update({ ...payload.bot });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchBots({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const bots =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/bots`)
              .once("value")
          ).val() || {};
        return Object.keys(bots).map(key => ({
          ...bots[key],
          id: key
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
