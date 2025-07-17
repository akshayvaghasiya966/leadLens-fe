import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Info, Settings } from "lucide-react";

export default function Dashboard() {
  // Data for Line Chart (Performance Trends)
  const lineData = [
    { name: "Day 1", uv: 60, pv: 30 },
    { name: "Day 2", uv: 55, pv: 28 },
    { name: "Day 3", uv: 50, pv: 26 },
    { name: "Day 4", uv: 48, pv: 25 },
    { name: "Day 5", uv: 45, pv: 24 },
    { name: "Day 6", uv: 47, pv: 23 },
    { name: "Day 7", uv: 46, pv: 22 },
  ];

  // Data for Pie Chart (Platform Distribution)
  const pieData = [
    { name: "Meta", value: 45 },
    { name: "Other 1", value: 30 },
    { name: "Other 2", value: 25 },
  ];
  const COLORS = ["#0088FE", "#FF8042", "#000000"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Metrics Cards */}
      <div>
        {/* stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Cost Per Qualified Lead */}
          <Card className="col-span-1 bg-green-50 border-green-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-700">
                  Cost Per Qualified Lead
                </p>
                <p className="text-2xl font-bold text-green-900">$0.00</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                ↓ 12.5%
              </Badge>
            </CardContent>
          </Card>

          {/* Cost Per Lead */}
          <Card className="col-span-1 bg-purple-50 border-purple-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-700">Cost Per Lead</p>
                <p className="text-2xl font-bold text-purple-900">$0.00</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                ↑ 8.2%
              </Badge>
            </CardContent>
          </Card>

          {/* Conversion Rate */}
          <Card className="col-span-1 bg-red-50 border-red-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-red-700">Conversion Rate</p>
                <p className="text-2xl font-bold text-red-900">0.00%</p>
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200">
                ↑ 2.1%
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform Integrations */}
      <Card className="my-2">
        <CardTitle className="py-2 px-4 flex w-full justify-between items-center">
          <span className="text-lg font-semibold">PlatForm Integrations</span>
          <Button variant={"outline"}>
            <Settings />
            Manage
          </Button>
        </CardTitle>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <Card className="col-span-1"><CardContent className="flex justify-between"><span className="text-lg font-semibold">Meta</span><Info className="cursor-pointer"/></CardContent></Card>
            <Card className="col-span-1"><CardContent className="flex justify-between"><span className="text-lg font-semibold">Tiktok</span><Info className="cursor-pointer"/></CardContent></Card>
            <Card className="col-span-1"><CardContent className="flex justify-between"><span className="text-lg font-semibold">Google</span><Info className="cursor-pointer"/></CardContent></Card>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends and Platform Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Performance Trends</h3>
            <select className="p-2 border rounded mb-4">
              <option>Last 7 days</option>
            </select>
            <div className="h-64">
              <LineChart
                width={400}
                height={250}
                data={lineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              Platform Distribution
            </h3>
            <div className="h-64 flex items-center justify-center">
              <PieChart width={300} height={250}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => {
                   console.log(entry)
                   return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )})}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
