<template>
	<div class="login">
		<div class="card">
			<img
				id="logo"
				src="..\assets\icon-left-font-monochrome-black.png"
				alt=""
			/>
			<p class="card__subtitle" v-if="mode == 'login'">
				Tu n'as pas encore de compte ?
				<span class="card__action" @click="switchToCreateAccount()"
					>Créer un compte</span
				>
			</p>
			<p class="card__subtitle" v-else>
				Tu as déjà un compte ?
				<span class="card__action" @click="switchToLogin()"
					>Se connecter</span
				>
			</p>
			<div class="form-row">
				<input
					v-model="email"
					class="form-row__input"
					type="text"
					placeholder="Adresse mail"
				/>
			</div>
			<div class="form-row" v-if="mode == 'create'">
				<input
					v-model="username"
					class="form-row__input"
					type="text"
					placeholder="Nom d'utilisateur"
				/>
			</div>
			<div class="form-row">
				<input
					v-model="password"
					class="form-row__input"
					type="password"
					placeholder="Mot de passe"
				/>
			</div>
			<div
				class="form-row"
				v-if="mode == 'login' && status == 'error_login'"
			>
				Adresse email et/ou mot de passe invalide
			</div>
			<div
				class="form-row"
				v-if="mode == 'create' && status == 'error_create'"
			>
				Adresse email déja utilisée
			</div>
			<button
				@click="login()"
				class="button"
				:class="{ 'button--disabled': !validFields }"
				v-if="mode == 'login'"
			>
				<span v-if="status == 'loading'">Connexion en cours</span>
				<span v-else>Connexion</span>
			</button>
			<button
				@click="createAccount()"
				class="button"
				:class="{ 'button--disabled': !validFields }"
				v-else
			>
				<span v-if="status == 'loading'">Création en cours</span>
				<span v-else>Créer mon compte</span>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Login",
	data() {
		return {
			mode: "login",
			email: "",
			username: "",
			password: "",
		};
	},
	computed: {
		validFields: function() {
			const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			const usernameRegEx = /^(?=.{3,15}$)[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z.]*)*$/;

			const passwordRegEx = /^([a-zA-Z0-9@*#]{4,15})$/;

			const emailValid = emailRegEx.test(this.email);

			const usernameValid = usernameRegEx.test(this.username);

			const passwordValid = passwordRegEx.test(this.password);

			if (this.mode == "create") {
				if (emailValid && usernameValid && passwordValid) {
					return true;
				} else {
					return false;
				}
			} else {
				if (emailValid && passwordValid) {
					return true;
				} else {
					return false;
				}
			}
		},
		...mapState(["status", "userInfos"]),
	},
	mounted() {
		this.$store.dispatch("getUserInfos").then(() => {
            let user = localStorage.getItem('user')
            if (!user) {
                user = {
                    userId: -1,
                    token: ''
                }
            }else{
                this.$router.push('/timeline')
            }
		});
	},
	methods: {
		switchToCreateAccount() {
			this.mode = "create";
		},
		switchToLogin() {
			this.mode = "login";
		},
		login() {
			if (!this.validFields) {
				return;
			}
			this.$store
				.dispatch("login", {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					this.$router.push("/timeline");
				})
				.catch((err) => console.log(err));
		},
		createAccount() {
			if (!this.validFields) {
				return;
			}
			this.$store
				.dispatch("createAccount", {
					email: this.email,
					username: this.username,
					password: this.password,
				})
				.then(() => this.login())
				.catch((err) => console.log(err));
		},
	},
};
</script>
