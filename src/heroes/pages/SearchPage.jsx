import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0 ) && heroes.length === 0;

  const { searchQuery, onInputChange } = useForm({
    searchQuery: q,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (searchQuery.trim().length <= 1) return;

    return navigate(`?q=${searchQuery.toLowerCase().trim()}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h5>Searching</h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              name="searchQuery"
              className="form-control"
              autoComplete="off"
              value={searchQuery}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {q === "" ? (
            <div className="alert alert-primary">Search a hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger">
                No hero with <b>{q}</b>
              </div>
            )
          )} */}

          <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? "" : "none"}}>
            Search a hero
          </div>

          <div className="alert alert-danger animate__animated animate__fadeIn" style={{ display: showError ? "" : "none" }}>
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
