import classes from "./InputLayout.module.scss";

import BackIcon from "@/assets/back.svg";


import CenterTitle from "@/components/CenterTitle/CenterTitle";

type InputLayoutProps = {
  children: React.ReactNode;
  title: string;
  desc: string;
};

const AuthLayout = ({ children, title, desc }: InputLayoutProps) => {
  return (
    <>
      <div className={classes.backLayout}>
        <img className={classes.back} src={BackIcon} alt="뒤로가기 아이콘" width={25} height={25} />

        <div className={classes.inputLayout}>
          <CenterTitle title={title} desc={desc} />
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
