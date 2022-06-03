import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import API from "../../../api/api";
import { setArticlesData } from "../../../slices/articlesSlice";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let article = useSelector((state) => state.articlesSlice.articles);

  useEffect(async () => {
    if (!article) {
      const data = await API.getAllArticles();
      dispatch(setArticlesData(data));
    }
  }, []);

  if (article) article = article.find((elem) => elem.id === parseInt(id, 10));

  return (
    <main className="achievements">
      {article ? (
        <div className="achievements__header">
          <h2 className="detail__title">Detail</h2>
          <p>{article.description}</p>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}

export default Detail;
