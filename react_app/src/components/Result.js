const Result = ({ tree }) => {
  const getColor = (percent) => {
    if (percent >= 100) return "bg-green-700 text-white";
    if (percent >= 80) return "bg-lime-500 text-white";
    if (percent >= 60) return "bg-yellow-500 text-white";
    if (percent >= 40) return "bg-amber-600 text-white";
    if (percent >= 20) return "bg-orange-600 text-white";
    if (percent > 0) return "bg-red-700 text-white";
    return "bg-red-900 text-white";
  };

  return (
    <a
      href={`/trees/${tree.id || tree.sciName}`}
      className={`
        relative flex items-center justify-between
        border border-gray-200 rounded-full shadow-sm
        md:flex-row hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2
      `}
    >
      <div className="flex">
        <div className="w-24 h-24">
          {tree.images?.length > 0 && (
            <img
              className="w-24 h-24 rounded-full md:rounded-full border border-gray-200 dark:border-gray-700 flex-shrink-0 flex justify-center items-center truncate"
              src={tree.images[0]}
              alt={tree.commonName || "Tree image"}
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-col justify-center px-4 py-2 gap-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {tree.commonName}
          </h5>
          <h6 className="font-normal text-gray-700 dark:text-gray-400">
            {tree.sciName}
          </h6>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 p-1 w-12 h-12 rounded-full aspect-square flex flex-shrink-0 justify-center items-center text-lg font-bold ${getColor(
          tree.passedPercent
        )}`}
      >
        {tree.passedPercent}
        <span className="text-sm">%</span>
      </div>
    </a>
  );
};

export default Result;
