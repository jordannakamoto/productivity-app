/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2GSltXzEsKY
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

// Import the background image

export default function Home() {
  return (
    <main className="flex flex-col h-screen" style={{
      backgroundImage: `url('/background.jpeg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <section className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="p-2">
          <h2 className="font-normal text-sm text-gray opacity-45">CS 450</h2>
        </div>
        <Card className="p-2 bg-gray-900 bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-75 shadow-none border-0 rounded">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg text-white">Assignment 1</CardTitle>
            <span className="inline-block bg-gray-500 text-xs text-white py-1 px-2 rounded-full">Due: in 5 days</span>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">
              Complete the first chapter of the textbook and solve the exercises at the end.
            </p>
          </CardContent>
        </Card>
        <div className="p-2">
          <h2 className="font-normal text-sm text-gray opacity-45">CS 460</h2>
        </div>
        <Card className="p-2 bg-gray-900 bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-75 shadow-none border-0 rounded">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg text-white">Lab Report</CardTitle>
            <span className="inline-block bg-gray-500 text-xs text-white py-1 px-2 rounded-full">Due: in 8 days</span>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">
              Submit a report on the pendulum experiment conducted in the last lab session.
            </p>
          </CardContent>
        </Card>
        <div className="p-2">
          <h2 className="font-normal text-sm text-gray opacity-45">POLS 200</h2>
        </div>
        <Card className="p-2 bg-gray-900 bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-75 shadow-none border-0 rounded">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg text-white">Book Review</CardTitle>
            <span className="inline-block bg-gray-500 text-xs text-white py-1 px-2 rounded-full">Due: in 10 days</span>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">Write a review on the book "To Kill a Mockingbird".</p>
          </CardContent>
        </Card>
      </section>
      {/* <section className="h-24 p-4 bg-gray-800 dark:bg-gray-900">
        <div className="flex items-center h-full">
          <Input
            className="flex-1 bg-transparent text-white placeholder-white"
            placeholder="Type your message and press Enter to send..."
          />
        </div>
      </section> */}
    </main>
  )
}