import Image from "next/image";

export const ProductHunt = () => {
  return (
    <a
      href="https://www.producthunt.com/posts/propulze?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-propulze"
      target="_blank"
    >
      <Image
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=451747&theme=light"
        alt="Propulze - Centralize&#0044;&#0032;share&#0032;and&#0032;follow&#0032;your&#0032;athletes&#0032;as&#0032;a&#0032;coach | Product Hunt"
        width={250}
        height={54}
      />
    </a>
  );
};
