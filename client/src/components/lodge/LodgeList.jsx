import LodgeCard from "./LodgeCard";

function LodgeList({ lodges }) {
  return lodges.map((lodge) => <LodgeCard key={lodge.id} lodge={lodge} />);
}

export default LodgeList;
