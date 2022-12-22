class User{
	constructor(firstName, lastName, gender, weight, height, age, activityLevel) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.activityLevel = activityLevel;
		this.age = age;
		this.height = height;
		this.weight = weight;
		this.bmr = 0;
		this.proteinRecommanded = 0;
		this.fatRecommanded = 0;
		this.carbsRecommanded = 0;
		this.caloriesRecommanded = 0;
		this.sugarRecommanded = 0;
		this.saltRecommanded = 0;
		this.proteinIntake = 0;
		this.fatIntake = 0;
		this.carbsIntake = 0;
		this.caloriesIntake = 0;
		this.sugarIntake = 0;
		this.saltIntake = 0;
	}
}

export default User;
