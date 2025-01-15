import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  TextField,
} from "@mui/material";

import classes from "@/layouts/Input/inputLayout.module.scss";

import { InputDataSet } from "@/types/react";

import InputLayout from "@/layouts/Input/InputLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationEmail, validationPassword } from "@/utils/validation";

type InputKey = "email" | "password" | "passwordCheck";

const PasswordEdit = () => {

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
    passwordCheck: {
      value: "",
      isError: false,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    },
  });
  const [isInitinal, setIsInitinal] = useState<boolean>(true);

  const isDisabled = useMemo(() => {
    return (
      isInitinal ||
      formData.email.isError ||
      formData.password.isError ||
      formData.passwordCheck.isError ||
      formData.email.value === "" ||
      formData.password.value === "" ||
      formData.passwordCheck.value === ""
    );
  }, [
    isInitinal,
    formData.email.isError,
    formData.email.value,
    formData.password.isError,
    formData.password.value,
    formData.passwordCheck.isError,
    formData.passwordCheck.value,
  ]);

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
  const handleChangeCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isInitinal) setIsInitinal(false);

      const { value } = event.target;
      setFormData((prev) => ({
        ...prev,
        passwordCheck: {
          ...prev.passwordCheck,
          value,
        },
      }));

      // 비밀번호 확인 시, 기존 password.value와 비교
      setFormData((prev) => {
        const passwordVal = prev.password.value;
        const isMatch = (value === passwordVal);
        return {
          ...prev,
          passwordCheck: {
            ...prev.passwordCheck,
            value,
            isError: !isMatch, // 불일치하면 에러
          },
        };
      });
    },
    [isInitinal],
  );



  return (
    <InputLayout title="비밀번호 변경" desc="비밀번호 변경을 위해 비밀번호를 입력해주세요.">
      <form className={classes.children}>
        <div className={classes.content}>
          <TextField
            type="password"
            autoComplete="off"
            label="비밀번호"
            variant="filled"
            value={formData.password.value}
            error={formData.password.isError}
            helperText={formData.password.isError && formData.password.errorMessage}
            onChange={(event) => handleChange(event, "password")}
          />
          <TextField
            type="password"
            autoComplete="off"
            label="비밀번호 확인"
            variant="filled"
            value={formData.passwordCheck.value}
            error={formData.passwordCheck.isError}
            helperText={formData.passwordCheck.isError && formData.passwordCheck.errorMessage}
            onChange={(event) => handleChangeCheck(event)}
          />
        </div>
        <FormButton text="비밀번호 변경" width="70%" isDisabled={isDisabled} />
      </form>
    </InputLayout>
  );
};

export default PasswordEdit;
