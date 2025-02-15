import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  TextField,
} from "@mui/material";

import classes from "@/layouts/Input/inputLayout.module.scss";

import { InputDataSet } from "@/types/react";

import InputLayout from "@/layouts/Input/InputLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationEmail } from "@/utils/validation";
import { UserApi } from "@/api/user";
import Cookies from "js-cookie"; // 쿠키에서 sessionKey 가져오는 넘인데 왜자꾸 빨간줄이 뜨지? -> 찾아봐야함

type InputKey = "email";

const PasswordFind = () => {

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

  const handleButton = async () => {
    try {
      
      const sessionKey = Cookies.get("sessionKey");
      if (!sessionKey) {
        console.error("세션 키 없음");
        return;
      }

      const response = await UserApi.postVerify(sessionKey, { email: formData.email.value });
      
      if (response.success) {
        // 인증 성공 시 처리
        alert("인증 번호가 발송되었습니다.");
      } else {
        // 인증 실패
        alert(response.message);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

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
        <FormButton 
          text="인증 번호 발송" 
          width="70%" 
          isDisabled={isDisabled} 
          onClick={handleButton} // 버튼 클릭 시 handleButton 호출
        />
      </form>
    </InputLayout>
  );
};

export default PasswordFind;
