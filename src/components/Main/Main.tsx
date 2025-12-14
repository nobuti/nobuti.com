interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <main className="flex flex-col flex-1">{children}</main>;
};
