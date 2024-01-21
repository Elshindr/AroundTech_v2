import Cookies from 'universal-cookie';

export default class UserService {

	static url = `${process.env.REACT_APP_BACK_URL}login/`;
	static cookies = new Cookies();

	static async loadUsers() {
		return fetch(`${process.env.REACT_APP_BACK_URL}users/all`, {
			method: 'GET',
			credentials: 'include', // Inclure les cookies si nécessaire
			headers: {
				'Content-Type': 'application/json',
			},
		})
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
		return fetch(`${process.env.REACT_APP_BACK_URL}users/${idUser}`, {
			method: 'GET',
			credentials: 'include', // Inclure les cookies si nécessaire
			headers: {
				'Content-Type': 'application/json',
			},
		})
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

		await this.getTokenCsrf();


		console.log(`url getOneUser`, `${process.env.REACT_APP_BACK_URL}login/`, email, pwd, this.cookies.get("XSRF-TOKEN"))


		return await fetch(`${process.env.REACT_APP_BACK_URL}login`, {
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
			body: JSON.stringify({ "email": email, "pwd": pwd })

		}).then((res) => {
			console.log(`getOneUser is okay`, res);
			return res.json();
		}).catch(error => {
			console.log(`Error dans getOneUser`, error);
			return false;
		});
	}


	static getCookie(name) {
		return this.cookies?.get(name);
	}


	static async getUserInfo() {


		return await fetch(`${this.url}user-info`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.cookies?.get("AUTH-TOKEN")}`
			},
		}).then(res => {
			if (res.status === 200) {
				return res.json();
			} else if (res.status === 204) {
				return undefined;
			}
			throw new Error(res)
		}).then(user => {

			return user;

		}).catch(error => {
			console.log(`error getUserInfo`, error);
		})
	}


	static async getTokenCsrf() {

		await fetch(`${this.url}csrf`, {
			method: 'POST',
			credentials: 'include', // Inclure les cookies si nécessaire
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		}).then(res => {
			//console.log(`res 1 `, res)

			return res.json();
		}).catch(error => {
			console.log(`error getTokenCsrf`, error);
		})

	}


	static async getLogout() {

		return await fetch(`${process.env.REACT_APP_BACK_URL}logout`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': this.cookies.get("XSRF-TOKEN")
			},
			body: JSON.stringify({})
		}).then(res => {
			if (res.status === 200) {
				//console.log(`cookie`, this.cookies)
				return true;
			}
			return false;
		}).catch(error => {
			console.log(`error getTokenCsrf`, error);
		})
	}


	static async addUser(formData) {

		return fetch(`${process.env.REACT_APP_BACK_URL}users`,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					'X-XSRF-TOKEN': this.cookies.get("XSRF-TOKEN")
				},
				credentials: 'include',
				method: "POST",
				body: JSON.stringify({ "firstname": formData.firstname, "lastname": formData.lastname, "email": formData.email, "pwd": formData.password, "idManager": formData.idManager, "nameManager": "", "role": { "id": formData.idRole, "name": "" } })
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

	static async updateUser(formData, idUser) {

		return fetch(`${process.env.REACT_APP_BACK_URL}users/${idUser}`,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					'X-XSRF-TOKEN': this.cookies.get("XSRF-TOKEN")
				},
				credentials: 'include',
				method: "PUT",
				body: JSON.stringify({ "firstname": formData.firstname, "lastname": formData.lastname, "email": formData.email, "pwd": formData.password, "idManager": formData.idManager, "nameManager": "", "role": { "id": formData.idRole, "name": "" } })
			})
			.then((res) => {
				//console.log(`res`, res)
				if (res.status === 200) {
					return true;
				}

				throw new Error("add addUser" + res);
			}).catch(error => {// TODO: Gestion affichage de l'erreur
				console.log(`Error dans addUser`, error);
				return false;
			});
	}

	static async deleteUser(idUser) {

		return fetch(`${process.env.REACT_APP_BACK_URL}users/${idUser}`,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					'X-XSRF-TOKEN': this.cookies.get("XSRF-TOKEN")
				},
				credentials: 'include',
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

		return fetch(`${process.env.REACT_APP_BACK_URL}users/allRoles`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(res => {
				return res.json();
			}).then(roles => {
				return roles;
			}).catch(error => {
				console.error("Erreur dans loadRole", error);
			});
	}


	static async loadManagers() {

		return fetch(`${process.env.REACT_APP_BACK_URL}users/allManagers`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(res => {
				return res.json();
			}).then(us => {
				return us;
			}).catch(error => {
				console.error("Erreur dans loadRole", error);
			});
	}
}