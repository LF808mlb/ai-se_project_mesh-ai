import morgan from "morgan";

const format = process.env.NODE_ENV === "development" ? "dev" : "combined";

export const logger = morgan(format);