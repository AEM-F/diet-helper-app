class Food {
    constructor(barcode, name, description, carbs, protein, fat, salt, sugar, totalCalories, imageUrl, quantity, consumedQuantity) {
        this.barcode = barcode;
        this.name = name;
        this.description = description;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.sugar = sugar;
        this.totalCalories = totalCalories;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.consumedQuantity = consumedQuantity;
    }
}

export default Food;
