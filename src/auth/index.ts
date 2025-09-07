// Services
import { getUserById, validateUser } from "@/users";
import createHttpError from "http-errors";
import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Service } from "typedi";

@Service()
export class AuthService {
  private _passport: PassportStatic;

  get passport(): PassportStatic {
    return this._passport;
  }

  constructor() {
    this._passport = passport;
    this.setup();
  }

  private setup() {
    // Local Strategy
    this.passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (username, password, done) => {
          try {
            const userId = await validateUser({ email: username, password });

            return done(null, { id: userId, provider: "LOCAL" });
          } catch (err) {
            return done(err);
          }
        }
      )
    );

    this.passport.serializeUser((user: Express.User, done) => {
      done(null, user);
    });

    this.passport.deserializeUser(async (user: Express.User, done) => {
      try {
        const dbUser = await getUserById(user);
        if (!dbUser) {
          throw createHttpError.NotFound(`User with id ${user.id} not found`);
        }

        done(null, {
          ...user,
          id: dbUser.id,
        });
      } catch (err) {
        done(err);
      }
    });
  }

  localLoginHandler() {
    return this.passport.authenticate("local");
  }
}
