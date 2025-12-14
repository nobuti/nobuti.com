interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="min-h-dvh flex flex-col max-w-[800px] mx-auto px-md pb-lg md:px-lg md:pb-xl">
      {children}
    </div>
  );
};
