import { JSX } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

interface AuthResponse {
  signature: string;
  token: string;
  expire: number;
}

const LoginForm = (): JSX.Element => {
  const publicKey = "public_oEVt3yV/1YOlT0us6N28k+INEYY=";
  const urlEndpoint = "https://ik.imagekit.io/sayujya/";

  const authenticator = async (): Promise<AuthResponse> => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/user/imageIO"
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
  };
  return (
    <div>
      <h1>
        Login to <span>Thera</span>Find
      </h1>

      <a href="#">Login with Google</a>
      <form action="">
        <label htmlFor="email">Email:</label>
        <input type="text" id="name" />
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <p>Upload an image</p>
          <IKUpload
            fileName="default-profile.png"
            onError={onError}
            onSuccess={onSuccess}
          />
        </IKContext>
      </form>
    </div>
  );
};
export default LoginForm;
