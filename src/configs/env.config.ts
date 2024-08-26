import { ZodError } from "zod";
import { EnvConfig, envSchema } from "../validations/env.validation";

export const validateEnv = () => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      port: +envVars.PORT,
      env: envVars.NODE_ENV,
      MONGO_DB_URI: envVars.MONGO_DB_URI,
    };
  } catch (error) {
    let message = undefined;
    if (error instanceof ZodError) {
      message = error.errors;
      console.error("Validation failed : ", error.errors);
    } else {
      console.error("Error parsing environment variables : ", error);
    }
  }
};
