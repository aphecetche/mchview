const ShowOutline = {
  chambers: false,
  des: false,
  dualSampas: false,
  pads: false,

  setAll: function() {
    this.chambers = this.des = this.dualSampas = this.pads = true;
  },
  setNone: function() {
    this.chambers = this.des = this.dualSampas = this.pads = false;
  },
  all: function() {
    return this.chambers && this.des && this.dualSampas && this.pads;
  },
  none: function() {
    return !this.chambers && !this.des && !this.dualSampas && !this.pads;
  }
};

export default ShowOutline;
