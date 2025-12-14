interface BannerProps {
  children: React.ReactNode;
}

export const Banner = (props: BannerProps) => (
  <div className="py-8 md:py-16 lg:py-32 text-lg font-bold [&_h1]:text-[2rem] [&_h1]:my-5 md:[&_h1]:text-5xl md:[&_h1]:my-9 lg:[&_h1]:text-6xl lg:[&_h1]:my-13 [&_p]:my-5 [&_p]:leading-normal [&_ul]:flex [&_ul]:gap-6">
    {props.children}
  </div>
);
