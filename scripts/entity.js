class Entity {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.toDelete = false;
    }
  
    move() {
      // Método genérico de movimentação, será sobrescrito nas subclasses
    }
  
    show() {
      // Método genérico para mostrar a entidade
    }
  
    disappear() {
      this.toDelete = true;
    }
  }
  