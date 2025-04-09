
import { useMemo } from "react";


import { BoardApi } from "@/api/board";

import useWindowSize from "@/hooks/useWindowSize";
import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import MyPageNavigation from "@/components/SubNavigation/MyPageNavigation/MyPageNavigation";

import classes from "./ActiveCommentLayout.module.scss";
import CategoryNavigation from "@/components/SubNavigation/CategoryNavigation/CategoryNavigation";

const ActiveCommentLayout = () => {
  const tabeltSize = 992;

  const { width } = useWindowSize();

  const header = useMemo(() => {
    return width > tabeltSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabeltSize]);

  const count = 5;

  return (
    <>
      {header}
      <div className={classes.layout}>
        <div className={classes.left}>
          <MyPageNavigation isActive={3} />
        </div>
        <main className={classes.main}>
            <CategoryNavigation isActive={3} />
            <InfinityScrollBoard
                queryKey={["userComment", count]}
                fetchFunction={BoardApi.fetchUserComments}
                count={count}
            />
        </main>
      </div>
    </>
  );
};

export default ActiveCommentLayout;