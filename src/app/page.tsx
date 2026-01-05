import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <div className="flex gap-2">
          <Input placeholder="Add new task" />
          <Button className="cursor-pointer" variant="outline">
            <Plus />
            Register
          </Button>
        </div>

        <Separator />
      </Card>
    </main>
  );
}
