const Card = ({ d }) => {
  return (
    <div className="border rounded p-3 flex flex-col">
      <figure>
        <img src={d.urlToImage} alt={d.author} className="rounded" />
        <figcaption>
          <p className="text-xs">{d.description.substring(0, 60)}...</p>
        </figcaption>
      </figure>
      <h2 className="text-2xl font-semibold">{d.title.substring(0, 30)}...</h2>
      <p className="text-slate-700 my-2">
        By <span className="font-medium">{d.author}</span> <i>{d.publishedAt}</i>
      </p>
      <p className="flex-grow pb-3">{d.content || "no content"}</p>
      <a href={d.url} className="bg-blue-500 block rounded py-2 hover:opacity-50 text-white text-center">
        view
      </a>
    </div>
  );
};
Card.propTypes;

export default Card;
