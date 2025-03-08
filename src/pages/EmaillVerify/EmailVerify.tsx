import { useState } from "react";
import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { UserApi } from "@/api/user";

const EmailVerify = () => {
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState<string>("");

  const emailButtonClick = async () => {
    const emailRegExp = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegExp.test(emailInput);

    console.log("click : ", emailInput);
    console.log("이메일 유효성 검사 : ", isEmailValid);

    if (!isEmailValid) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    try {
      
      const response = await UserApi.postVerify({email : emailInput});

      console.log("이메일 인증 요청 성공:", response);
      // alert("이메일 인증번호가 발송되었습니다.");    
      navigate("/email/verify/code", { 
        state: { email: emailInput } 
      });
      console.log("navigate 함수 실행 완료");

    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      alert("이메일 인증 요청에 실패했습니다.");
    }
  };

  const handleEmailInput = (value: string) => {
    setEmailInput(value);
  };

  return (
    <EmailVerifyLayout>
      <EnterInformation
        title="이메일 인증"
        description="해당 SNS 계정은 이메일이 누락되어 있습니다. 원활한 서비스를 위해 이메일을 인증해주세요."
        placeholder="이메일"
        buttonText="인증 번호 발송"
        inputType="email"
        onButtonClick={emailButtonClick}
        onChange={handleEmailInput}
      />
    </EmailVerifyLayout>
  );
};

export default EmailVerify;
