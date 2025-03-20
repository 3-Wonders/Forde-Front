import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
} from "@mui/material";

import classes from "@/layouts/Input/inputLayout.module.scss";

import { InputDataSet } from "@/types/react";

import InputLayout from "@/layouts/Input/InputLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationEmail, validationPassword } from "@/utils/validation";
import { UserApi } from "@/api/user";

type InputKey = "email" | "password";

const EmailChange = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      formData.email.value === ""
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
      }
    },
    [isInitinal, checkValidationEmail],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.table(formData);

      // const params = new URLSearchParams(location.search);
      // if (params.get("redirect")) {
      //   navigate(params.get("redirect") as string);
      // } else {
      //   navigate("/");
      // }

        try {
          
          const response = await UserApi.postVerify({email : formData.email.value});
    
          console.log("이메일 인증 요청 성공:", response);
          // alert("이메일 인증번호가 발송되었습니다.");    
          navigate("/change/verify", { 
            state: { email: formData.email.value } 
          });
          console.log("navigate 함수 실행 완료");
    
        } catch (error) {
          console.error("이메일 인증 요청 실패:", error);
          alert("이메일 인증 요청에 실패했습니다.");
        }
    },
    [formData, location.search, navigate],
  );

  return (
    <InputLayout title="이메일 변경" desc="이메일을 변경하기 위해서는 인증 절차가 필수입니다.">
      <form className={classes.children} onSubmit={handleSubmit}>
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

export default EmailChange;
