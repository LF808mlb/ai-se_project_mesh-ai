import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { registerUser } from "../../utils/api";

export default function Register() {
	const [submitError, setSubmitError] = useState("");
	const { values, errors, isValid, handleChange } = useFormWithValidation();
	const navigate = useNavigate();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!isValid) {
			setSubmitError("Please correct the highlighted fields.");
			return;
		}

		try {
			const response = await registerUser(
				values.name ?? "",
				values.email ?? "",
				values.password ?? "",
			);

			if (!response.success) {
				setSubmitError(response.error?.message ?? "Registration failed");
				return;
			}

			setSubmitError("");
			navigate("/login");
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : "Registration failed");
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
				<h1 className="form__title">Create account</h1>
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
					<label className="form__label" htmlFor="register-name">
						Name
						<input
							id="register-name"
							className={`form__input${errors.name ? " form__input_error" : ""}`}
							name="name"
							type="text"
							required
							minLength={2}
							maxLength={40}
							autoComplete="name"
							value={values.name ?? ""}
							onChange={handleChange}
						/>
					</label>
					{errors.name && <p className="form__error">{errors.name}</p>}
				</div>

				<div className="form__input-container">
					<label className="form__label" htmlFor="register-email">
						Email
						<input
							id="register-email"
							className={`form__input${errors.email ? " form__input_error" : ""}`}
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
					<label className="form__label" htmlFor="register-password">
						Password
						<input
							id="register-password"
							className="form__input"
							name="password"
							type="password"
							required
							minLength={8}
							autoComplete="new-password"
							value={values.password ?? ""}
							onChange={handleChange}
						/>
					</label>
					{errors.password && <p className="form__error">{errors.password}</p>}
				</div>

				<button className="form__submit-btn" type="submit" disabled={!isValid}>
					Create account
				</button>
				<p className="form__status" role="status" aria-live="polite">
					{submitError}
				</p>
			</form>
		</main>
	);
}
