import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { withRouter } from "next/router";
import { getItem, setItem } from "@/components";
import { themesSetting } from "@/recoil";
import { useUser } from "../../components/context/UserContext";
import styles from "./Login.module.scss";

const defaultValue = {
  username: "",
  password: "",
};

const Login = (props: any) => {
  const setTheme = useSetRecoilState(themesSetting);
  const { setUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const onSubmit = async (data: any) => {
    const userData = {
      userid: "sam",
      username: data.username,
      token: 12341212,
      role: "organiser",
    };
    setUser(userData);
    setItem("userdata", userData);
    props.router.push("/userDashboard");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.logo}>
           Convene <span>App</span>
          </div>
          <h1 className={styles.heading}>Holla, Welcome Back</h1>
          <p className={styles.subHeading}>
            Hey, welcome back to your special place
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <input
                  id="username"
                  type="text"
                  placeholder=" "
                  {...register("username", { required: true })}
                />
                <label htmlFor="username">Email</label>
              </div>
              {errors.username && <p className="error">Email is required</p>}
            </div>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder=" "
                  {...register("password", { required: true })}
                />
                <label htmlFor="password">Password</label>
                <i
                  className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"} ${
                    styles.icon
                  }`}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                ></i>
              </div>
              {errors.password && (
                <p className="error">Password is required</p>
              )}
            </div>
            <div className={styles.buttons}>
              <button
                type="button"
                className={`${styles.button} ${styles.secondary}`}
              >
                Switch Method
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.primary}`}
                disabled={!isDirty || !isValid}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.imageSection}>
        <img src="/assets/login2.jpeg" alt="Login Illustration" />
      </div>
    </div>
  );
};

export default withRouter(Login);
