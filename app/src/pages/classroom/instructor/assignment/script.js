import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  data: () => ({
    dateFormat: { month: 'short', day: 'numeric' },
    expandedProblem: null,
    name: '',
    description: '',
    textCanvas: document.createElement('canvas'),
  }),

  computed: {
    params() { return this.$route.params; },
    classroomFetched() { return this.classroom.fetched || false; },
    id() { return this.$route.params.assignmentId; },
    assignment() {
      if (!this.classroomFetched) return null;
      return this.classroom.assignments.find(({ id }) => id === this.id) || null;
    },
    assignmentFetched() { return (this.assignment || {}).fetched || false; },
  },

  methods: {
    ...mapActions(['fetchAssignment', 'mutateAssignment']),

    save() {
      if (this.name !== this.assignment.name || this.description !== this.assignment.description) {
        this.mutateAssignment({
          classroom: this.classroom.code,
          assignment: { id: this.id, name: this.name, description: this.description },
        });
      }
    },

    updateHeaderInputWidth() {
      const ctx = this.textCanvas.getContext('2d');
      const rem = parseFloat(getComputedStyle(document.body).fontSize);
      ctx.font = `${rem * 1.35}px 'lato', sans-serif`;
      if (this.$refs.headerInput) {
        this.$refs.headerInput.style.width = `${(ctx.measureText(this.name).width / rem) * 1.05}rem`;
      }
    },

    updated() {
      this.name = (this.assignment || {}).name;
      this.description = (this.assignment || {}).description;
      if (this.name) this.$nextTick(this.updateHeaderInputWidth);
    },
  },

  async created() {
    this.updated();
    if (!this.classroomFetched) await new Promise(resolve => this.$watch('classroomFetched', (f) => { if (f) resolve(); }));
    this.fetchAssignment({
      classroom: this.classroom.code,
      id: this.id,
    });
  },

  watch: {
    classroom(classroom, oldClassroom) {
      const [oldIds, newIds] = [oldClassroom, classroom]
        .map(c => (c.assignments || []).map(a => a.id));
      if (oldIds.includes(this.id) && !newIds.includes(this.id)) {
        this.$router.replace({ name: 'classroom-assignments', params: this.params });
      }
    },

    assignment() { this.updated(); },
  },

  components: {
    'problem-summary': require('./problem-summary/problem-summary.vue').default,
    'not-found': require('../../../404/404.vue').default,
  },
};
