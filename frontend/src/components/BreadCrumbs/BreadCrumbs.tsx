import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { goBack } from "../../app/slices/breadcrumbsSlice";
import './BreadCrumbs.css';


const Breadcrumbs = () => {
  const breadcrumbs = useAppSelector((state) => state.breadcrumbs);
  const dispatch = useAppDispatch();

  const handleGoBack = (index:number) => {
    const stepsBack = breadcrumbs.length - index - 1;
    if (stepsBack > 0) {
      dispatch(goBack(stepsBack));
    }
  };

  return (
    <nav className="nav-breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.path}>
          <Link className="breadcrumbs" to={crumb.path} onClick={() => handleGoBack(index)}>
            {crumb.name}
          </Link>
          {index < breadcrumbs.length - 1 && " | "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
