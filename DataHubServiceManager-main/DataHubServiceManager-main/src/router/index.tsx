import { Routes, Route } from "react-router-dom";
import { Suspense } from 'react';
import { Skeleton } from 'antd';
import routes from "./routes";

const Router = () => {
  return (
    <Routes>
        {routes.map((item, i) => {
        return (
          <Route
            element={
              <Suspense fallback={<Skeleton active/>}>
                <item.element />
              </Suspense>
            }
            key={i}
            path={item.path}
          />
        );
      })}
    </Routes>
  );
};

export default Router;