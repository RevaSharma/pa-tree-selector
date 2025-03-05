const Result = ({ tree }) => {
  return (
    <a
      href=""
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      {tree.images?.length > 0 && (
        <img
          className="object-cover w-full rounded-t-lg h-24 md:w-24 md:rounded-none md:rounded-s-lg"
          src={tree.images[0]}
          alt={tree.commonName || "Tree image"}
        />
      )}
      <div class="flex flex-col justify-between px-4 py-2 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {tree.commonName}
        </h5>
        <h6 class="font-normal text-gray-700 dark:text-gray-400">
          {tree.sciName}
        </h6>
      </div>
    </a>
  );
};

export default Result;
