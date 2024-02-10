import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card";
import { format } from "date-fns";
import { FaSearch, FaSpinner } from "react-icons/fa";

const apiKey = "9c6131f2202d4dafb822bc76564f80c4"; // https://newsapi.org/

const NewsApi = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [cari, setCari] = useState("");

  const [small, setSmall] = useState(false);

  const date = format(new Date() - 60 * 24 * 24 * 1000, "yyyy-mm-dd");

  const pencarianSemua = useCallback(
    (cari) => {
      setLoad(true);
      axios
        .get(`https://newsapi.org/v2/everything?q=${cari}&from=${date}&pageSize=10&apiKey=${apiKey}`)
        .then((res) => (res.data.status === "ok" ? setData(res.data.articles) : null))
        .catch((err) => setErrMsg(err.response.data.message))
        .finally(() => setLoad(false));
    },
    [date]
  );

  const pencarianHeadline = useCallback(() => {
    setLoad(true);
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
      .then((res) => (res.data.status === "ok" ? setData(res.data.articles) : null))
      .catch((err) => setErrMsg(err.response.data.message))
      .finally(() => setLoad(false));
  }, []);

  const handleSearch = (e) => {
    setCari(e.target.value);
  };

  useEffect(() => {
    if (!cari || cari.length === 0) return pencarianHeadline();
    else return pencarianSemua(cari);
  }, [pencarianSemua, pencarianHeadline, cari]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 450) setSmall(true);
      else setSmall(false);
    };
    window.addEventListener("resize", () => resize());
    resize();
  }, []);

  const Search = (
    <div className="flex items-center justify-center">
      <div className="border-l border-y inline-block p-3 rounded-tl rounded-bl">
        <FaSearch />
      </div>
      <input
        type="text"
        className="border-y border-r p-2 pl-0 rounded-tr w-full sm:w-auto rounded-br focus:outline-none"
        value={cari}
        onChange={handleSearch}
        placeholder={`Search here`}
      />
    </div>
  );

  let content;
  if (load)
    content = (
      <p className="text-center mt-10">
        <FaSpinner className="inline-block text-3xl animate-spin" />
      </p>
    );
  else if (errMsg) content = <p>{errMsg}</p>;
  else
    content =
      data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.map((d, i) => {
            if (d.urlToImage) {
              return <Card key={i} d={d} />;
            }
          })}
        </div>
      ) : (
        <p className="text-center font-semibold mt-5">
          <i>News not found</i>
        </p>
      );

  return (
    <section>
      <h1 className="font-semibold text-xl md:text-3xl text-center">NewsApi</h1>
      <div className="flex justify-between py-2">
        <button
          className="border-2 border-dashed leading-none p-2 backdrop-blur flex-shrink-0"
          onClick={() => {
            setCari("");
            pencarianHeadline();
          }}
        >
          {small ? "Top" : "Top Headlines: US"}
        </button>
        {Search}
      </div>
      {content}
    </section>
  );
};

export default NewsApi;
