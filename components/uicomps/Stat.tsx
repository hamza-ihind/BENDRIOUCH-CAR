interface StatProps {
  number: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ number, label }) => {
  return (
    <div className="flex flex-col gap-3 items-center w-fit">
      <h1 className="text-center text-6xl font-semibold text-orange-700 dark:text-orange-200">
        {number}
      </h1>
      <p className="desc-text min-w-[40%] text-center">{label}</p>
    </div>
  );
};

export default Stat;
