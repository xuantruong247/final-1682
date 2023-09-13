import React, { memo } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { AiOutlineRight } from "react-icons/ai";

const Breakcrumb = ({ title }) => {
  const routes = [
      { path: "/product", breadcrumb: "Product" },
      { path: "/", breadcrumb: "Home" },
    { path: "/product/:pid/:title", breadcrumb: title },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  console.log(breadcrumb);
  return (
    <div className="text-sm flex items-center gap-1">
      {breadcrumb
        .filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, seft) => (
          <Link
            className="flex items-center justify-center gap-1 hover:text-main"
            key={match.pathname}
            to={match.pathname}
          >
            <span className="flex items-center ">{breadcrumb}</span>
            {index !== seft.length - 1 && <AiOutlineRight size={10} />}
          </Link>
        ))}
    </div>
  );
};

export default memo(Breakcrumb);
