class Score {
    constructor() {
      this.value = 0;
      this.maxSpeedInterval = 500; 
      this.color = color(255); 
    }

    increment() {
        this.value++;
        this.updateAliensShootInterval();
        this.updateScoreColor();
      }
    
      get() {
        return this.value;
      }

      
}