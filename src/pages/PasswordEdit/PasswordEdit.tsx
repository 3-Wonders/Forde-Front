import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "@/layouts/Input/inputLayout.module.scss";

import { InputDataSet } from "@/types/react";

import InputLayout from "@/layouts/Input/InputLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationPassword } from "@/utils/validation";

import Cookies from "js-cookie";
import { UserApi } from "@/api/user";

type InputKey = "password" | "passwordCheck";

const PasswordEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidRandomKey, setIsValidRandomKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [randomKey, setRandomKey] = useState<string>("");

  const [formData, setFormData] = useState<InputDataSet<InputKey, string>>({
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
      formData.password.isError ||
      formData.passwordCheck.isError ||
      formData.password.value === "" ||
      formData.passwordCheck.value === ""
    );
  }, [
    isInitinal,
    formData.password.isError,
    formData.password.value,
    formData.passwordCheck.isError,
    formData.passwordCheck.value,
  ]);

  // URL에서 randomKey 가져오기 및 유효성 검사
  useEffect(() => {
    const checkRandomKey = async () => {
      setIsLoading(true);
      try {
        // URL에서 randomKey 가져오기
        const queryParams = new URLSearchParams(location.search);
        const keyFromUrl = queryParams.get("key");
        
        if (!keyFromUrl) {
          // randomKey가 없으면 메인 페이지로 리다이렉트
          navigate("/");
          return;
        }
        
        setRandomKey(keyFromUrl);
        
        // randomKey 유효성 검사 API 호출
        const response = await UserApi.postCheckRandomKey("dbstjdqls14@gmail.com",keyFromUrl);
        
        // status 204가 넘어오면 페이지를 정상적으로 표시
        if(response.status == 204)
          setIsValidRandomKey(true);
        else
          navigate("/");
      } catch (error) {
        console.error("랜덤키 검증 실패:", error);
        // 에러 발생 시 메인 페이지로 리다이렉트
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkRandomKey();
  }, [location.search, navigate]);

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
        case "password":
          checkValidationPassword(event.target.value);
          break;
      }
    },
    [isInitinal, checkValidationPassword],
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

  const handleButton = async () => {
    try {
      console.log("pw" + formData.password.value);
      console.log("rk : " + randomKey);
      const response = await UserApi.patchPassword({ 
        email: "dbstjdqls14@gmail.com",
        password: formData.password.value, 
        randomKey: randomKey 
      });
      
      alert("비밀번호가 변경 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중이거나 랜덤키가 유효하지 않으면 아무것도 표시하지 않음
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!isValidRandomKey) {
    return null; // 이미 useEffect에서 리다이렉트 처리함
  }

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
        <FormButton 
          text="비밀번호 변경" 
          width="70%" 
          isDisabled={isDisabled} 
          onClick={handleButton}
        />
      </form>
    </InputLayout>
  );
};

export default PasswordEdit;
