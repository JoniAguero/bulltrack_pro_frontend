import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Search, Bell, Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Bulltrack Pro</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Design System & UI Kit Demo</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Buttons Section */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Atomic button interactions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button size="icon" variant="outline"><Bell className="h-4 w-4" /></Button>
            </CardContent>
          </Card>

          {/* Badges Section */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>

          {/* Inputs Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Inputs & Forms</CardTitle>
              <CardDescription>Data entry components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex max-w-sm w-full items-center space-x-2">
                <Input type="email" placeholder="Email address" />
                <Button type="submit">Subscribe</Button>
              </div>
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search bulls..." className="pl-9" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
