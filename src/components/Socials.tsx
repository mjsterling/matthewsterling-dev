import {
  img1298732CodepenIcon,
  imgCodewars,
  imgGithubMarkWhite,
  imgInWhite_34,
} from '../assets';

export const Socials = () => {
  return (
    <div className="flex gap-8 justify-center items-center">
      <a href="https://www.linkedin.com/in/matthew-sterling-dev/">
        <button
          className="h-8 w-8 bg-cover"
          style={{ backgroundImage: `url(${imgInWhite_34})` }}
        />
      </a>
      <a href="https://github.com/mjsterling">
        <button
          className="h-8 w-8 bg-cover"
          style={{ backgroundImage: `url(${imgGithubMarkWhite})` }}
        />
      </a>
      <a href="https://codepen.io/mjsterling">
        <button
          className="h-8 w-8 bg-cover"
          style={{ backgroundImage: `url(${img1298732CodepenIcon})` }}
        />
      </a>
      <a href="https://codewars.com/users/mjsterling">
        <button
          className="h-8 w-8 bg-cover"
          style={{ backgroundImage: `url(${imgCodewars})` }}
        />
      </a>
    </div>
  );
};
