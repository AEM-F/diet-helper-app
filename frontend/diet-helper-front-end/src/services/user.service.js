import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
	getPublicContent() {
		return axios.get(API_URL + 'all');
	}

	getUserBoard() {
		return axios.get(API_URL + 'user', { headers: authHeader() });
	}

	getModeratorBoard() {
		return axios.get(API_URL + 'mod', { headers: authHeader() });
	}

	getAdminBoard() {
		return axios.get(API_URL + 'admin', { headers: authHeader() });
	}

	saveUserToLocalStorage(user){
		localStorage.setItem('user-data', JSON.stringify(user));
	}

	getUserFromLocalStorage(){
		return JSON.parse(localStorage.getItem('user-data'));
	}

	initialLoadUser(user){
		let macros = this.calculateMacros(user.age, user.gender, user.weight, user.height, user.activityLevel);
		user.bmr = Math.round(macros.bmr);
		user.proteinRecommanded = Math.round(macros.protein);
		user.fatRecommanded = Math.round(macros.fat);
		user.carbsRecommanded = Math.round(macros.carbs);
		user.caloriesRecommanded = Math.round(macros.calories);
		user.proteinRecommanded = Math.round(macros.protein);
		user.saltRecommanded = Math.round(macros.salt);
		user.sugarRecommanded = Math.round(macros.sugar);
		this.saveUserToLocalStorage(user);
	}

	calculateMacros(age, gender, weight, height, activityLevel) {
		// Calculate basal metabolic rate (BMR) using the Mifflin-St. Jeor equation more accurate then Harris-Benedict equation
		let BMR;
		if (gender === 'male') {
			BMR = 10 * weight + 6.25 * height - 5 * age + 5;
		} else {
			BMR = 10 * weight + 6.25 * height - 5 * age - 161;
		}

		// Calculate daily calorie needs based on BMR and activity level
		let calories;
		if (activityLevel === 'sedentary') {
			calories = BMR * 1.2;
		} else if (activityLevel === 'light') {
			calories = BMR * 1.375;
		} else if (activityLevel === 'moderately') {
			calories = BMR * 1.55;
		} else if (activityLevel === 'very') {
			calories = BMR * 1.725;
		} else {
			calories = BMR * 1.9;
		}

		// Calculate macronutrient ratios
		const protein = weight * 2.2; // grams of protein per day
		const fat = calories * 0.25 / 9; // grams of fat per day
		const carbs = (calories - (protein * 4) - (fat * 9)) / 4; // grams of carbs per day

		// Calculate daily sugar and salt recommendations
		const sugar = calories * 0.1 / 4; // grams of sugar per day
		const salt = 2.3; // grams of salt per day

		return {
			calories,
			protein,
			fat,
			carbs,
			sugar,
			salt,
			bmr: BMR
		};
	}
}

export default new UserService();
