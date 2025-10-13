import { Resend } from "resend";
import env from "../configs/environment.config.js";

export const resendClient = new Resend(env.RESEND_API_KEY);
export const sender = {
  email: env.EMAIL_FROM,
  name: env.EMAIL_FROM_NAME,
};
