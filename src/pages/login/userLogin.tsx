import { Button, InputField, getItem, setItem } from "@/components";
import { themesSetting } from "@/recoil";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { withRouter } from "next/router";
import { useUser } from "../../components/context/UserContext";
import styles from "./Login.module.scss";

const defaultValue = {
  username: "",
  password: "",
};

const Login = (props: any) => {
  const setTheme = useSetRecoilState(themesSetting);
  const { setUser } = useUser();

  useEffect(() => {
    const userData = getItem("userdata");
    if (userData?.token) {
      props.router.push("/userDashboard");
    }
    setTheme({
      header: false,
      sidebar: false,
      footer: false,
      content: true,
    });
    return () => {
      setTheme({
        header: true,
        sidebar: true,
        footer: true,
        content: true,
      });
    };
  }, [props.router, setTheme]);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValue,
  });
  const [password, setPassword] = useState(true);

  const onSubmit = async (data: any) => {
    props.router.push("/userDashboard");
    const userData = {
      userid: "sam",
      username: data.username,
      token: 12341212,
      role: "organiser",
    };
    setUser(userData);
    setItem("userdata", userData);
  };

  return (
    <div className={styles.loginContainer}>
  {/* Form Section */}
  <div className={styles.formSection}>
    <div className={styles.logo}>
      Anywhere <span>App</span>
    </div>
    <h1 className={styles.heading}>
      Create new account <span>.</span>
    </h1>
    <p className={styles.subHeading}>
      Already a member? <a href="/login">Log in</a>
    </p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <div className={styles.inputField}>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
          <i className="fas fa-user icon"></i>
        </div>
        {errors.username && <p className="error">Username is required</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <div className={styles.inputField}>
          <input
            id="password"
            type={password ? "password" : "text"}
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <i
            className={`fas ${password ? "fa-eye-slash" : "fa-eye"} icon`}
            onClick={() => setPassword(!password)}
          ></i>
        </div>
        {errors.password && <p className="error">Password is required</p>}
      </div>
      <div className={styles.buttons}>
        <button type="button" className="secondary">
          Change Method
        </button>
        <button
          type="submit"
          className="primary"
          disabled={!isDirty || !isValid}
        >
          Create Account
        </button>
      </div>
    </form>
  </div>

  {/* Image Section */}
  <div className={styles.imageSection}>
    <img src="/assets/loginimage.jpg" alt="Beautiful Mountain" />
  </div>
</div>

  );
};

export default withRouter(Login);
