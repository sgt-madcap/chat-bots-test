export default {
  data: () => ({
    date: new Date(),
    modal: "",
    datepicker: "",
    isDragging: false,
    image: "",
    title: "",
    description: ""
  }),
  watch: {
    open: function(val) {
      if (val === true) {
        this.modal.open();
      }
    }
  },
  mounted() {
    let modal = this.$refs.modal;
    // eslint-disable-next-line no-undef
    M.Modal.init(modal);
    // eslint-disable-next-line no-undef
    this.modal = M.Modal.getInstance(modal);
  }
};
