import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { useNavigate, Navigate } from "react-router-dom";
import {
  fetchAuth,
  fetchRegister,
  selectIsAuth,
} from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
export const Registration = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "", password: "", fullName: "" },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("не удалось авторизоваться");
    }
  };

  // проверка на авторизацию
  const isAuth = useSelector(selectIsAuth);
  if (isAuth) {
    return <Navigate to="/" />;
  }
  console.log(isAuth, "selectIsAuth");
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <TextField
          {...register("fullName", { required: "Укажите fullname" })}
          helperText={errors.fullName?.message}
          error={Boolean(errors.fullName?.message)}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          {...register("email", { required: "Укажите email" })}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          type="email"
          fullWidth
        />
        <TextField
          {...register("password", { required: "Укажите пароль" })}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
