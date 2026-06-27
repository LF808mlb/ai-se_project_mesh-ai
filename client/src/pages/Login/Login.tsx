import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "../../utils/api";

export default function Login() {
	const [submitError, setSubmitError] = useState("");
	const { values, errors, isValid, handleChange } = useFormWithValidation();
	const { login } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!isValid) {
			setSubmitError("Please correct the highlighted fields.");
			return;
		}

		try {
			const res = await loginUser(values.email ?? "", values.password ?? "");

			if (res.data) {
				setSubmitError("");
				login(res.data.token, res.data.user);
				navigate("/knowledge");
				return;
			}

			setSubmitError(res.error?.message ?? "Invalid credentials");
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : "Something went wrong");
		}
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
					<label className="form__label" htmlFor="login-email">
						Email
						<input
							id="login-email"
							className="form__input"
							name="email"
							type="email"
							required
							autoComplete="email"
							value={values.email ?? ""}
							onChange={handleChange}
						/>
					</label>
					{errors.email && <p className="form__error">{errors.email}</p>}
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
