const d3 = {
  ...require('d3-selection'),
  ...require('d3-shape'),
  ...require('d3-transition'),
  ...require('d3-ease'),
};

const size = 200;

export default {
  props: {
    type: { type: String, required: true, validator: value => ['ring', 'pie'].includes(value) },
    progress: { type: Number, default: 0 },
    transitionDuration: { type: Number, default: 450 },
    transitionDelay: { type: Number, default: 0 },
  },

  computed: {
    fillAngle() { return this.progress * Math.PI * 2; },
  },

  mounted() {
    const svg = d3.select(this.$refs.target);
    svg.attr('viewBox', `0 0 ${size} ${size}`);
    const radius = size / 2;

    // Track

    const ringTrackThickness = size * 0.13;

    this.trackArc = d3.arc()
      .startAngle(0)
      .endAngle(Math.PI * 2)
      .innerRadius(this.type === 'ring'
        ? radius - ringTrackThickness
        : 0)
      .outerRadius(radius);

    this.track = svg.insert('path', '.feather-check')
      .attr('class', 'track')
      .attr('d', this.trackArc)
      .attr('transform', `translate(${size / 2}, ${size / 2})`); // center

    // Progress arc inside track

    const ringProgressThickness = ringTrackThickness * 0.75;
    const ringGapBetween = (ringTrackThickness - ringProgressThickness) / 2;

    this.fillArc = d3.arc()
      .startAngle(0)
      .endAngle(this.fillAngle)
      .innerRadius(this.type === 'ring'
        ? radius - ringGapBetween - ringProgressThickness // Inner radius in ring mode
        : 0) // No inner radius in pie mode
      .outerRadius(this.type === 'ring'
        ? radius - ringGapBetween // Gap in ring mode
        : radius) // Goes to edge in pie mode
      .cornerRadius(this.type === 'ring'
        ? ringProgressThickness / 2 // Round caps in ring mode
        : 0); // Don't round the edges of a pie

    this.fill = svg.insert('path', '.feather-check')
      .attr('class', 'fill')
      .attr('d', this.fillArc)
      .attr('transform', `translate(${size / 2 + 0}, ${size / 2 + 0})`);

    // Checkmark for completed pies

    const check = d3.select(this.$refs.check);
    const checkSize = 130;
    check.attr('width', checkSize).attr('height', checkSize);
    check.attr('x', 38.9).attr('y', 41.5);
  },

  watch: {
    fillAngle(angle, oldAngle) {
      this.fill
        .transition()
        .delay(this.transitionDelay)
        .ease(d3.easeCubicOut)
        .duration(this.transitionDuration)
        .attrTween('d', () => t => this.fillArc.endAngle(oldAngle + (angle - oldAngle) * t)());
    },
  },

};
