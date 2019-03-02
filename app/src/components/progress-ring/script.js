const d3 = {
  ...require('d3-selection'),
  ...require('d3-shape'),
  ...require('d3-transition'),
  ...require('d3-ease'),
};

const size = 200;

export default {
  props: {
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

    const trackThickness = size * 0.13;

    this.trackArc = d3.arc()
      .startAngle(0)
      .endAngle(Math.PI * 2)
      .innerRadius(radius - trackThickness)
      .outerRadius(radius);

    this.track = svg.append('path')
      .attr('class', 'track')
      .attr('d', this.trackArc)
      .attr('transform', `translate(${size / 2}, ${size / 2})`); // center

    // Progress arc inside track

    const progressThickness = trackThickness * 0.75;
    const gapBetween = (trackThickness - progressThickness) / 2;

    this.fillArc = d3.arc()
      .startAngle(0)
      .endAngle(this.fillAngle)
      .innerRadius(radius - gapBetween - progressThickness)
      .outerRadius(radius - gapBetween)
      .cornerRadius(progressThickness / 2);

    this.fill = svg.append('path')
      .attr('class', 'fill')
      .attr('d', this.fillArc)
      .attr('transform', `translate(${size / 2 + 0}, ${size / 2 + 0})`);
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
