import {environment} from "../../environments/environment.prod";

export class AppProdConstants {
  private static API_BASE_URL = environment.url;
  private static OAUTH2_URL = AppProdConstants.API_BASE_URL + "oauth2/authorize/";
  private static REDIRECT_URL = "?redirect_uri=" + environment.redirectUrl;
  public static API_URL = AppProdConstants.API_BASE_URL + "api/";
  public static AUTH_API = AppProdConstants.API_URL + "auth/";
  public static GOOGLE_AUTH_URL = AppProdConstants.OAUTH2_URL + "google" + AppProdConstants.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL = AppProdConstants.OAUTH2_URL + "facebook" + AppProdConstants.REDIRECT_URL;
  public static GITHUB_AUTH_URL = AppProdConstants.OAUTH2_URL + "github" + AppProdConstants.REDIRECT_URL;
  public static LINKEDIN_AUTH_URL = AppProdConstants.OAUTH2_URL + "linkedin" + AppProdConstants.REDIRECT_URL;
}
