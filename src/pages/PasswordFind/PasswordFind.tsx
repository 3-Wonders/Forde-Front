import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  TextField,
} from "@mui/material";

import classes from "@/layouts/Input/inputLayout.module.scss";

import { InputDataSet } from "@/types/react";

import InputLayout from "@/layouts/Input/InputLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationEmail, validationPassword } from "@/utils/validation";

type InputKey = "email" | "password";

const PasswordFind = () => {

  const [formData, setFormData] = useState<InputDataSet<InputKey, string>>({
    email: {
      value: "",
      isError: false,
      errorMessage: "올바른 이메일 형식이 아닙니다.",
    },
    password: {
      value: "",
      isError: false,
      errorMessage: "8 ~ 16자 이내 및 영문, 숫자, 특수문자를 포함해야 합니다.",
    },
  });
  const [isInitinal, setIsInitinal] = useState<boolean>(true);

  const isDisabled = useMemo(() => {
    return (
      isInitinal ||
      formData.email.isError ||
      formData.password.isError ||
      formData.email.value === "" ||
      formData.password.value === ""
    );
  }, [isInitinal, formData.email.isError, formData.email.value, formData.password.isError, formData.password.value]);

  const checkValidationEmail = useCallback((email: string) => {
    const isValidate = validationEmail(email);

    setFormData((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        isError: !isValidate,
      },
    }));
  }, []);

  const checkValidationPassword = useCallback((password: string) => {
    const isValidate = validationPassword(password);

    setFormData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        isError: !isValidate,
      },
    }));
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: InputKey) => {
      if (isInitinal) setIsInitinal(false);

      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          value: event.target.value,
        },
      }));

      switch (key) {
        case "email":
          checkValidationEmail(event.target.value);
          break;
        case "password":
          checkValidationPassword(event.target.value);
          break;
      }
    },
    [isInitinal, checkValidationEmail, checkValidationPassword],
  );


  return (
    <InputLayout title="비밀번호 찾기" desc="비밀번호를 찾기 위해 가입한 이메일을 입력해주세요.">
      <form className={classes.children}>
        <div className={classes.content}>
          <TextField
            type="email"
            autoComplete="off"
            label="이메일"
            variant="filled"
            value={formData.email.value}
            error={formData.email.isError}
            helperText={formData.email.isError && formData.email.errorMessage}
            onChange={(event) => handleChange(event, "email")}
          />
        </div>
        <FormButton text="인증 번호 발송" width="70%" isDisabled={isDisabled} />
      </form>
    </InputLayout>
  );
};

export default PasswordFind;
