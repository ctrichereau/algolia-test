import Image from "next/image";
import { Highlight } from "react-instantsearch-dom";

interface HitModel {
  name: string;
  rating: string;
  image: string;
  genre: string[];
}

interface HitCompoProps {
  hit: HitModel;
}

export const HitCompo = (props: HitCompoProps) => {
  return (
    <a href={"/"}>
      <div className="card">
        <div className="card-image">
          <Image
            src={props.hit.image}
            width="80"
            height="100"
            alt={props.hit.name}
            className="image"
          />
        </div>
        <div className="card-contents">
          <Highlight attribute="title" hit={props.hit} className="card-title" />
          <Highlight attribute="year" hit={props.hit} className="card-year" />
          <div className="card-rating">Rating: {props.hit.rating}</div>
          <div className="card-genre">
            <span>{props.hit.genre[0]}</span> <span>{props.hit.genre[1]}</span>
          </div>
        </div>
      </div>
    </a>
  );
};
