interface TilesProps {
  children: React.ReactNode;
}

export const Tiles = (props: TilesProps) => (
  <div className="m-0 [&_ul]:list-none [&_ul]:grid [&_ul]:gap-8 [&_ul]:grid-cols-[repeat(auto-fit,minmax(256px,1fr))] [&_a]:text-[var(--primary)] [&_a]:font-bold [&_a]:no-underline [&_a]:block [&_a]:mb-4 [&_a:hover]:text-[var(--secondary)] [&_a:focus]:text-[var(--secondary)] [&_h2]:text-2xl [&_h2]:mb-8">
    {props.children}
  </div>
);
