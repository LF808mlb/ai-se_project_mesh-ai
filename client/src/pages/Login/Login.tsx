import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

export default function Login() {
	const [submitError, setSubmitError] = useState("");
	const { values, errors, isValid, handleChange } = useFormWithValidation();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!isValid) {
			setSubmitError("Please correct the highlighted fields.");
			return;
		}

		setSubmitError("");
		console.log("Login form values:", {
			username: values.username ?? "",
			password: values.password ?? "",
		});
	}

	function getNavLinkClass({ isActive }: { isActive: boolean }) {
		return isActive ? "form__nav-link form__nav-link_active" : "form__nav-link";
	}

	return (
		<main className="auth-page">
			<header className="header">
				<img className="header__logo" alt="MeshAI logo" src={logo} />
			</header>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<h1 className="form__title">Sign in</h1>
				<p className="form__subtitle">Access your organization's secure workspace</p>

				<nav className="form__nav" aria-label="Authentication pages">
					<NavLink to="/login" className={getNavLinkClass}>
						Login
					</NavLink>
					<NavLink to="/register" className={getNavLinkClass}>
						Register
					</NavLink>
				</nav>

				<div className="form__input-container">
					<label className="form__label" htmlFor="login-username">
						Email
						<input
							id="login-username"
							className="form__input"
							name="username"
							type="text"
							required
							minLength={2}
							autoComplete="username"
							value={values.username ?? ""}
							onChange={handleChange}
						/>
					</label>
					{errors.username && <p className="form__error">{errors.username}</p>}
				</div>

				<div className="form__input-container">
					<label className="form__label" htmlFor="login-password">
						Password
						<input
							id="login-password"
							className="form__input"
							name="password"
							type="password"
							required
							minLength={8}
							autoComplete="current-password"
							value={values.password ?? ""}
							onChange={handleChange}
						/>
					</label>
					{errors.password && <p className="form__error">{errors.password}</p>}
				</div>

				<button className="form__submit-btn" type="submit" disabled={!isValid}>
					Login
				</button>
				<p className="form__status" role="status" aria-live="polite">
					{submitError}
				</p>
			</form>
		</main>
	);
}
