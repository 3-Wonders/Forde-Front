import { useEffect, useState } from "react";
import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";
import { useLocation, useNavigate } from 'react-router-dom';

import { UserApi } from "@/api/user";

const EmailChangeVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {

        const email = location.state?.email;
        if (email) {
          setEmail(email);
        }
      } catch (error) {
        console.error("이메일 불러오기 실패:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const codeButtonClick = async () => {
    try {
      console.log("email :: " + email + " , code :: " + codeInput);
      const response = await UserApi.patchEmailWithVerify({email : email, verifyCode: codeInput});
      // if (response.statusCode == 200 )
      console.log("인증 완료 : " + response);
      navigate("/");
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      alert("이메일 인증 요청에 실패했습니다.");
    }
  };

  const handleCodeInput = (value: string) => {
    setCodeInput(value);
  };

  return (
    <EmailVerifyLayout>
      <EnterInformation
        title="인증 코드 입력"
        description={`"${email}" 해당 이메일로 인증 코드를 발송하였습니다.`}
        placeholder="인증번호"
        buttonText="이메일 변경"
        inputType="text"
        onButtonClick={codeButtonClick}
        onChange={handleCodeInput}
      />
    </EmailVerifyLayout>
  );
};

export default EmailChangeVerify;
