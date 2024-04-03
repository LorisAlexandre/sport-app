import { ProductHunt, Reddit, Twitter } from ".";

export const FeaturedOn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
      <p className="min-w-fit">Vu sur</p>
      <ul className="flex gap-4">
        <ProductHunt />
        <Twitter />
        <Reddit />
      </ul>
    </div>
  );
};
