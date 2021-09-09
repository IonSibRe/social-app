import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../context/UserContext";
import LoaderSpinner from "../components/utils/LoaderSpinner";

const Register = () => {
	const { login, loggedIn } = useContext(UserContext);
	const [error, setError] = useState("");
	const [userCredentials, setUserCredentials] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: user } }) {
			login(user);
		},
		onError(err) {
			setError(err.graphQLErrors[0].extensions.errMsg);
		},

		variables: { registerInput: userCredentials },
	});

	const submitHandler = (e) => {
		e.preventDefault();
		registerUser();
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			setError("");
		}, 3000);
		return () => clearTimeout(timeout);
	}, [error]);

	if (loggedIn) return <Redirect to="/" />;

	return (
		<section className="auth-section section-center">
			<div className="auth-card">
				<div className="auth-card-inner-wrap">
					<div className="auth-card-title-wrap">
						<h3 className="auth-card-title">Register</h3>
					</div>
					{error && (
						<div className="auth-card-error-wrap">
							<p className="auth-card-error-text">{error}</p>
						</div>
					)}
					<form
						className="auth-card-form-wrap"
						onSubmit={submitHandler}
					>
						<div className="auth-card-form-item">
							<label
								htmlFor="email"
								className="auth-card-form-label "
							>
								Username
							</label>
							<input
								type="text"
								className="auth-card-form-input"
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										username: e.target.value,
									})
								}
							/>
						</div>
						<div className="auth-card-form-item">
							<label
								htmlFor="email"
								className="auth-card-form-label "
							>
								Email
							</label>
							<input
								type="email"
								className="auth-card-form-input"
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className="auth-card-form-item">
							<label
								htmlFor="password"
								className="auth-card-form-label "
							>
								Password
							</label>
							<input
								type="password"
								className="auth-card-form-input"
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										password: e.target.value,
									})
								}
							/>
						</div>
						<div className="auth-card-form-item">
							<label
								htmlFor="confirmPassword"
								className="auth-card-form-label "
							>
								Confirm Password
							</label>
							<input
								type="password"
								className="auth-card-form-input"
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										confirmPassword: e.target.value,
									})
								}
							/>
						</div>
						<div className="auth-card-form-item">
							<p className="auth-card-form-info-text">
								Already have an account?{" "}
								<Link
									to="/login"
									className="auth-card-form-redirect-link"
								>
									sign in here.
								</Link>
							</p>
						</div>
						<div className="auth-card-form-submit-item">
							<button
								type="submit"
								className="auth-card-form-login-btn"
							>
								Register
							</button>
							{loading && <LoaderSpinner />}
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

const REGISTER_USER = gql`
	mutation registerUser($registerInput: RegisterInput!) {
		register(registerInput: $registerInput) {
			id
			username
			email
			token
		}
	}
`;

export default Register;
