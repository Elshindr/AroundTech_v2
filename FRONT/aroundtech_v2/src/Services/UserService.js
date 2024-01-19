import axios from 'axios';
import Cookies from 'universal-cookie';

export default class UserService {

	static url = `${process.env.REACT_APP_BACK_URL}login/`;
	static cookies = new Cookies();
	static tokenCsrf = "";


	static async loadUsers() {
		return fetch(`${process.env.REACT_APP_BACK_URL}users/all`)
			.then(res => {
				return res.json();
			})
			.then(us => {
				return us;
			})
			.catch(error => {
				console.error("Erreur dans loadUser", error);
			});
	}


	static async loadOneUser(idUser) {

		console.log(`${process.env.REACT_APP_BACK_URL}users/${idUser}`)
		return fetch(`${process.env.REACT_APP_BACK_URL}users/${idUser}`)
			.then(res => {
				return res.json();
			})
			.then(us => {
				return us;
			})
			.catch(error => {
				console.error("Erreur dans loadOneUser", error);
			});
	}


	static async getOneUser(email, pwd) {

		await this.getTokenCsrfold();

		await this.getUserInfo();

		console.log(`url getOneUser`, this.url, email, pwd, this.cookies.get("XSRF-TOKEN"))


		return fetch(this.url, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				'X-XSRF-TOKEN': this.cookies.get("XSRF-TOKEN"),

			},
			withCredentials: true,
			credentials: 'include',
			secure: true,
			sameSite: "Strict",
			method: "POST",
			body: JSON.stringify({ "email": email, "pwd": pwd }),
		})
			.then((res) => {

				console.log(`getOneUser is okay`, res);
				return res.json();
			})
			.catch(error => {
				console.log(`Error dans getOneUser`, error);
				return false;
			});
	}

	/* static async getCsrf(){
		/* const response = await axios.get(this.url+'/csrf');
		axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;

		console.log(`response`,response)
		console.log(`response.data`,response.data)
		console.log(`response.data.CSRFToken`,response.data.CSRFToken) 

		return await fetch(this.url+'/csrf',{
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				'X-XSRF-TOKEN': this.cookies.get("XSRF-TOKEN"),
			},
			"withCredentials": true,
			secure: true, 
			sameSite: "Strict",
			method: "POST",
			body: JSON.stringify(),
		}).then(res =>{
			console.log(`res`, res)
			if (res.status == 200){
				return true;
			}
			return false;
		})
		.catch(error => {
			console.log(`Error dans getCsrf`, error);
			
		});

	}
 */
	/* static getCookie(name) {

		const cookies = document.cookie
			.split(';')
			.map(cookie => cookie.split('=').map(s => s.trim()));

			console.log(`cookies`, cookies)
		return cookies.find(c => c[0] === name)?.[1] || '';
	}

 */

	static async getUserInfo() {

		console.log(`getUserInfo`)
		//const jwtToken = localStorage.getItem('AUTH-TOKEN');
		const jwtToken = this.cookies.get("AUTH-TOKEN");




		await fetch(`${this.url}/user-info`, {
			method: 'GET',
			credentials: 'include', // Inclure les cookies si nécessaire
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`
			},
		}).then(res => {
			console.log(`res 1 `, res)

			return res.json();
		}).then(res => {


			console.log(`res json`, res)
			//this.tokenCsrf = res.headers.get('X-CSRF-TOKEN');

		}).catch(error => {
			console.log(`error getTokenCsrf`, error);
		})
	}

	static async getTokenCsrfold() {

		let test = await fetch(`${this.url}/csrf`, {
			method: 'POST',
			credentials: 'include', // Inclure les cookies si nécessaire
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		}).then(res => {
			console.log(`res 1 `, res)

			return res.json();
		}).then(res => {


			console.log(`res json`, res)
			//this.tokenCsrf = res.headers.get('X-CSRF-TOKEN');

		}).catch(error => {
			console.log(`error getTokenCsrf`, error);
		})

	}


	static async addUser(formData) {

		return fetch(`${process.env.REACT_APP_BACK_URL}users`,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify({ "firstname": formData.firstname, "lastname": formData.lastname, "email": formData.email, "pwd": formData.password, "idManager":formData.idManager, "nameManager":"" , "role":{"id":formData.idRole, "name":""}})
			})
			.then((res) => {
				if (res.status === 200) {
					return true;
				}

				throw new Error("add addUser" + res);
			})
			.catch(error => {// TODO: Gestion affichage de l'erreur
				console.log(`Error dans addUser`, error);
				return false;
			});
	
	}

	static async updateUser(formData, idUser){

		//console.log(`json =`, JSON.stringify({ "firstname": formData.firstname, "lastname": formData.lastname, "email": formData.email, "pwd": formData.password, "idManager":formData.idManager, "nameManager":"" , "role":{"id":formData.idRole, "name":""}}))
				console.log(`${process.env.REACT_APP_BACK_URL}users/${idUser}`, formData)
				return fetch(`${process.env.REACT_APP_BACK_URL}users/${idUser}`,
					{
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json"
						},
						method: "PUT",
						body: JSON.stringify({ "firstname": formData.firstname, "lastname": formData.lastname, "email": formData.email, "pwd": formData.password, "idManager":formData.idManager, "nameManager":"" , "role":{"id":formData.idRole, "name":""}})
					})
					.then((res) => {
						console.log(`res`, res)
						if (res.status === 200) {
							return true;
						}

						throw new Error("add addUser" + res);
					})
					.catch(error => {// TODO: Gestion affichage de l'erreur
						console.log(`Error dans addUser`, error);
						return false;
					});
	}

	static async deleteUser(idUser){

		console.log(`${process.env.REACT_APP_BACK_URL}users/${idUser}`)
		return fetch(`${process.env.REACT_APP_BACK_URL}users/${idUser}`,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "DELETE"
			})
			.then((res) => {
				console.log(`res`, res)
				if (res.status === 200) {
					return true;
				}

				throw new Error("deleteUser" + res);
			})
			.catch(error => {// TODO: Gestion affichage de l'erreur
				console.log(`Error dans deleteUser`, error);
				return false;
			});
		
	}

	

	static async loadRoles() {
		
		console.log(`${process.env.REACT_APP_BACK_URL}users/allRoles`)
		return fetch(`${process.env.REACT_APP_BACK_URL}users/allRoles`)
			.then(res => {
				return res.json();
			})
			.then(us => {
				return us;
			})
			.catch(error => {
				console.error("Erreur dans loadRole", error);
			});
	}

	static async loadManagers(){
		console.log(`${process.env.REACT_APP_BACK_URL}users/allManagers`)
		return fetch(`${process.env.REACT_APP_BACK_URL}users/allManagers`)
			.then(res => {
				return res.json();
			})
			.then(us => {
				return us;
			})
			.catch(error => {
				console.error("Erreur dans loadRole", error);
			});
	}
}