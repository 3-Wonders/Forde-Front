import { useEffect, useState } from "react";
import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";

import Cookies from "js-cookie";
import { UserApi } from "@/api/user";

const EmailVerifyCode = () => {
  const [codeInput, setCodeInput] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        // const sessionKey = Cookies.get("sessionKey");
        // if (!sessionKey) {
        //   console.error("세션 키 없음");
        //   return;
        // }
        const response = await UserApi.getIntroUser();
        if (response && response.email) {
          setEmail(response.email);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const codeButtonClick = async () => {
    try {

      const sessionKey = Cookies.get("sessionKey");
      if (!sessionKey) {
        console.error("세션 키 없음");
        return;
      }

      const response = await UserApi.postVerifyCompare({email : email, verifyCode: codeInput});
      // if (response.statusCode == 200 )
      alert("인증 완료 : " + response);
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

export default EmailVerifyCode;
