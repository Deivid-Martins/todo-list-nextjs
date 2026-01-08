import { Check, List, TriangleAlert } from "lucide-react";
import { Badge } from "./ui/badge";

type FilterProps = {
  currentFilter: "all" | "incomplete" | "completed";
  setCurrentFilter: React.Dispatch<
    React.SetStateAction<"all" | "incomplete" | "completed">
  >;
};

export default function Filter({
  currentFilter,
  setCurrentFilter,
}: FilterProps) {
  return (
    <div className="flex gap-2">
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("all")}
      >
        <List />
        All
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "incomplete" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("incomplete")}
      >
        <TriangleAlert />
        Incomplete
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "completed" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("completed")}
      >
        <Check />
        Completed
      </Badge>
    </div>
  );
}
