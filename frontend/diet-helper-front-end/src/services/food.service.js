class FoodService {
    getMealPlan(date, timeOfDay){
        return JSON.parse(localStorage.getItem('meal-plan-'+date+'-'+timeOfDay));
    }

    addNewMealPlan(mealPlan){
        console.log(mealPlan);
        localStorage.setItem('meal-plan-'+mealPlan.date+'-'+mealPlan.timeOfDay, JSON.stringify(mealPlan));
    }

    removeFoodFromMealPlan(date, timeOfDay, barcode){
        let mealPlan = this.getMealPlan(date, timeOfDay);
        // Find the index of the item with the given id
        const index = mealPlan.consumedFoods.findIndex(item => item.barcode === barcode);
        // If the item was found, remove it from the array
        if (index !== -1) {
            mealPlan.consumedFoods.splice(index, 1);
        }
        this.addNewMealPlan(mealPlan);
    }

    calculateTotalMacroForMealPlan(date){
        let mealPlan = this.getMealPlan(date);
        let totalCarbs = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalSalt = 0;
        let totalSugar = 0;
        let totalCalories = 0;

        mealPlan.consumedFoods.forEach((food) =>{
            totalCarbs += food.carbs;
            totalProtein += food.protein;
            totalFat += food.fat;
            totalSalt += food.salt;
            totalSugar += food.sugar;
            totalCalories += food.totalCalories;
        });

        return {
            carbs: totalCarbs,
            protein: totalProtein,
            fat: totalFat,
            salt: totalSalt,
            sugar: totalSugar,
            calories: totalCalories
        };
    }
}

export default new FoodService();
