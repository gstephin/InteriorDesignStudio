import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  submittedAt: string;
}

export default function AdminPage() {
  const { data: submissions, isLoading, isError, refetch } = useQuery<ContactSubmission[]>({
    queryKey: ['/.netlify/functions/api/contact'],
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Website
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Contact Form Submissions</h1>
          </div>
          <Button onClick={() => refetch()} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading submissions...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error loading submissions. Please try again.
          </div>
        ) : submissions && submissions.length > 0 ? (
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <Card key={submission.id} className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{submission.name}</CardTitle>
                      <CardDescription>
                        Submitted on {new Date(submission.submittedAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    {submission.service && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#A67F5D] text-white">
                        {submission.service}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                      <div className="mt-1 text-sm">
                        <p>Email: {submission.email}</p>
                        {submission.phone && <p>Phone: {submission.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Message</h3>
                      <p className="mt-1 text-sm whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-medium">No submissions yet</h3>
            <p className="text-gray-500 mt-2">
              When visitors submit the contact form, their submissions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}