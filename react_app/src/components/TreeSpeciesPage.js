import { useParams } from "react-router-dom";

const TreeSpeciesPage = ({ trees }) => {
  const { sciName } = useParams();
  const tree = trees.find(
    (tree) => tree.sciName.toLowerCase() === sciName.toLowerCase()
  );

  if (!tree) {
    return <div className="p-4 text-red-500">Finding {sciName}...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      {tree.images?.length > 0 && (
        <img
          src={tree.images[0]}
          alt={tree.commonName || "Tree image"}
        />
      )}
      <h1 className="text-3xl font-bold">{tree.commonName}</h1>
      <h2 className="text-xl text-gray-600 italic">{tree.sciName}</h2>

      {/* Iterate over all properties and display them */}
      <div className="mt-4">
        {Object.entries(tree).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key}:</strong> {JSON.stringify(value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeSpeciesPage;
