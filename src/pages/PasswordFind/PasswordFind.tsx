import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import {
  TextField,
} from "@mui/material";

import classes from "@/layouts/Input/inputLayout.module.scss";

import { InputDataSet } from "@/types/react";

import InputLayout from "@/layouts/Input/InputLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationEmail } from "@/utils/validation";
import { UserApi } from "@/api/user";
import { useNavigate } from "react-router-dom";

type InputKey = "email";

const PasswordFind = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState<InputDataSet<InputKey, string>>({
    email: {
      value: "",
      isError: false,
      errorMessage: "올바른 이메일 형식이 아닙니다.",
    }
  });
  const [isInitinal, setIsInitinal] = useState<boolean>(true);

  const isDisabled = useMemo(() => {
    console.log(
      isInitinal ||
      formData.email.isError ||
      formData.email.value === "");
    return (
      isInitinal ||
      formData.email.isError ||
      formData.email.value === "" 
    );
  }, [isInitinal, formData.email.isError, formData.email.value]);

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

  const handleButton = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await UserApi.postVerify({email : formData.email.value});
      console.log("Response :: " + response);     
      

      if (response.success) {
        
        navigate("/password/verify", { 
          state: { email: formData.email.value } 
        });
        console.log("navigate 함수 실행 완료");
      } else {
        // 인증 실패
          alert("이메일 인증 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  return (
    <InputLayout title="비밀번호 찾기" desc="비밀번호를 찾기 위해 가입한 이메일을 입력해주세요.">
      <form className={classes.children} onSubmit={handleButton}>
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
        <FormButton 
          text="인증 번호 발송" 
          width="70%" 
          isDisabled={isDisabled} 
        />
      </form>
    </InputLayout>
  );
};

export default PasswordFind;
