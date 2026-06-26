import { useCallback, useState } from "react";

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function useFormWithValidation() {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((event: React.ChangeEvent<FormElement>) => {
    const { name, value, validationMessage } = event.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));

    const form = event.target.closest("form");
    setIsValid(Boolean(form?.checkValidity()));
  }, []);

  return { values, errors, isValid, handleChange };
}
