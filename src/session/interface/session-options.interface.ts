export interface ISessionOptions {
  secret: string;
  expiresIn: number;
  salt?: string;
}
