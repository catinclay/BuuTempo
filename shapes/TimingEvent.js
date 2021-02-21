function TimingEvent(timing, context, event) {
	this.timing = timing;
	this.event = event;
	this.context = context;
}

TimingEvent.prototype.shouldOccur = function(time) {
	return time >= this.timing;
}

TimingEvent.prototype.occur = function() {
	this.event(this.context);
}