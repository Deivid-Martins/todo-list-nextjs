import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Check, List, Plus, TriangleAlert } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Add new task" />
          <Button className="cursor-pointer">
            <Plus />
            Register
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-2">
            <Badge className="cursor-pointer">
              <List />
              All
            </Badge>
            <Badge className="cursor-pointer">
              <TriangleAlert />
              Incomplete
            </Badge>
            <Badge className="cursor-pointer">
              <Check />
              Completed
            </Badge>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
